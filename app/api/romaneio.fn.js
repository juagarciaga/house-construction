import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "romaneios";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  let requestJSON;
  console.log({ event, context });
  if (event.body) {
    requestJSON = JSON.parse(event.body);
  }

  try {
    switch (event.routeKey) {
      case "DELETE /romaneios/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /romaneios/{id}":
        const getResult = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = getResult.Item;
        break;
      case "GET /romaneios":
        const limit = event.queryStringParameters?.limit ? parseInt(event.queryStringParameters.limit) : 1000;
        const lastEvaluatedKey = event.queryStringParameters?.lastEvaluatedKey ? JSON.parse(decodeURIComponent(event.queryStringParameters.lastEvaluatedKey)) : undefined;

        const scanParams = {
          TableName: tableName,
          Limit: limit,
          ExclusiveStartKey: lastEvaluatedKey,
        };

        const scanResult = await dynamo.send(new ScanCommand(scanParams));
        console.log({ scanParams, scanResult, LastEvaluatedKey: scanResult.LastEvaluatedKey });
        body = {
          items: scanResult.Items ? scanResult.Items : [],
          count: scanResult.Count,
          lastEvaluatedKey: scanResult.LastEvaluatedKey ? encodeURIComponent(JSON.stringify(scanResult.LastEvaluatedKey)) : null,
        };
        console.log({ body });

        break;
      case "PUT /romaneios":
        try {
          console.log({ requestJSON });
          await dynamo.send(
            new PutCommand({
              TableName: tableName,
              Item: {
                id: requestJSON.id,
                week: requestJSON.week,
                provider: requestJSON.provider,
                ccoMaterial: requestJSON.ccoMaterial,
                clasification: requestJSON.clasification,
                note: requestJSON.note,
                createdDate: requestJSON.createdDate,
                expiredDate: requestJSON.expiredDate,
                value: requestJSON.value,
                paymentType: requestJSON.paymentType,
                obs: requestJSON.obs,
                year: requestJSON.year,
                month: requestJSON.month,
                isInRomaneio: requestJSON.isInRomaneio,
              },
            })
          );
          body = `Put item ${requestJSON.id}`;
          break;
        } catch (error) {
          console.error(error);
        }
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};

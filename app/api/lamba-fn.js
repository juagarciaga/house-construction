import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "expenses";

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
      case "DELETE /items/{id}":
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
      case "GET /items/{id}":
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
      case "GET /items":
        const limit = event.queryStringParameters?.limit ? parseInt(event.queryStringParameters.limit) : 10;
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
          lastEvaluatedKey: scanResult.LastEvaluatedKey ? encodeURIComponent(JSON.stringify(scanResult.LastEvaluatedKey)) : null,
        };
        console.log({ body });

        break;
      case "PUT /items":
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id: requestJSON.id,
              whoPaid: requestJSON.whoPaid,
              expenseDate: requestJSON.paidDate,
              expenseType: requestJSON.paidType,
              expenseCategory: requestJSON.category,
              description: requestJSON.description,
              expenseValue: requestJSON.value,
              month: requestJSON.month,
              year: requestJSON.year,
            },
          })
        );
        body = `Put item ${requestJSON.id}`;
        break;
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
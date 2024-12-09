import AWS from 'aws-sdk';

AWS.config.update({
  region: 'sa-east-1', // Update with your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default dynamoDb;

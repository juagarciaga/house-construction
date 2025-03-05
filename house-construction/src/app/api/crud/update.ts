// pages/api/crud/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDb from '../../../../aws-config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { id, name } = req.body;

  const params = {
    TableName: 'YourTableName',
    Key: {
      id,
    },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': name,
    },
  };

  try {
    await dynamoDb.update(params).promise();
    res.status(200).json({ message: 'Item updated successfully!' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

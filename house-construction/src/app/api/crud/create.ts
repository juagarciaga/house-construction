// pages/api/crud/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDb from '../../../../aws-config';


export default async function CreateTable(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { id, name } = req.body;

  const params = {
    TableName: 'YourTableName',
    Item: {
      id,
      name,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    res.status(200).json({ message: 'Item created successfully!' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

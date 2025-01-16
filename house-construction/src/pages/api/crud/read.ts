// pages/api/crud/read.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDb from '../../../../aws-config';

export default function ReadDB(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  const params = {
    TableName: 'YourTableName',
    Key: {
      id: id as string,
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();
    res.status(200).json(data.Item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

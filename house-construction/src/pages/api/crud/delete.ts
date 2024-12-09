// pages/api/crud/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dynamoDb from '../../../../aws-config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const { id } = req.body;

  const params = {
    TableName: 'YourTableName',
    Key: {
      id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    res.status(200).json({ message: 'Item deleted successfully!' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

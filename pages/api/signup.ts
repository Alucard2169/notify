import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface Data {
  user_id: number | null;
  username: string | null;
  email: string | null;
}

interface RequestData {
  username: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const requestData: RequestData = req.body;
    const { username, email, password: user_password } = requestData;

    const user = await prisma.users.create({
      data: {
        username,
        email,
        user_password,
      },
    });

    const findUser = await prisma.users.findUnique({
      where: {
        user_id: user.user_id,
      },
    });

    const userData: Data = {
      user_id: findUser?.user_id ?? null,
      username: findUser?.username ?? null,
      email: findUser?.email ?? null,
    };

    res.status(200).json(userData);
  } catch (err: any) {
      if (err.code === 'P2002') {
          if (err.meta.target === 'users_username_key') {
            return res.status(501).json({ error: 'username not available' } as ErrorResponse);
          }
          if(err.meta.target === 'users_email_key'){
              return res.status(501).json({ error: 'Email not available' } as ErrorResponse);
          }
    } else {
      return res.status(501).json({ error: err } as ErrorResponse);
    }
  }
}

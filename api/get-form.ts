import type { VercelApiHandler } from '@vercel/node';
import { prisma } from '../api-utils/db';
import {
  SESSION_ID_COOKIE_NAME,
  withAddCookie,
} from '../api-utils/withAddCookie';
import { withAllowedMethod } from '../api-utils/withAllowedMethod';
import type { RaffleRecord } from '@prisma/client';

export type RaffleRecordDto = Omit<RaffleRecord, 'id' | 'userSessionId'>;

const handler: VercelApiHandler = async (req, res) => {
  if (!req.cookies[SESSION_ID_COOKIE_NAME]) {
    // await prisma.raffleRecord.create({ data: { userSessionId:  } });
    return;
  }

  const record: RaffleRecordDto = await prisma.raffleRecord.upsert({
    create: {
      userSessionId: req.cookies[SESSION_ID_COOKIE_NAME],
    },
    where: {
      userSessionId: req.cookies[SESSION_ID_COOKIE_NAME],
    },
    update: {},
    select: {
      email: true,
      firstName: true,
      familyName: true,
      gender: true,
      dateOfBirth: true,
      profilePhoto: true,
    },
  });

  res.status(200).json(record);
};

export default withAddCookie(withAllowedMethod('GET', handler));

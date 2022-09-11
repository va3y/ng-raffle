import type { VercelApiHandler } from '@vercel/node';
import { prisma } from '../api-utils/db';
import { withAllowedMethod } from '../api-utils/withAllowedMethod';
import {
  SESSION_ID_COOKIE_NAME,
  withAddCookie,
} from '../api-utils/withAddCookie';
import { RaffleRecordStatus } from '@prisma/client';

const handler: VercelApiHandler = async (req, res) => {
  const [submissionsCount] = await Promise.all([
    prisma.raffleRecord.count({
      where: { userSessionId: req.cookies[SESSION_ID_COOKIE_NAME] },
    }),
    prisma.raffleRecord.update({
      where: { userSessionId: req.cookies[SESSION_ID_COOKIE_NAME] },
      data: { status: RaffleRecordStatus.Submitted },
    }),
  ]);

  res.status(200).json({ submissionsCount });
};

export default withAddCookie(withAllowedMethod('POST', handler));

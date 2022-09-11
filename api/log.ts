import type { Log } from '@prisma/client';
import type { VercelApiHandler } from '@vercel/node';
import { SESSION_ID_COOKIE_NAME } from '../api-utils/withAddCookie';
import { prisma } from '../api-utils/db';
import { withAllowedMethod } from '../api-utils/withAllowedMethod';

export type LogDto = Omit<Log, 'id'>;

const handler: VercelApiHandler = async (req, res) => {
  await prisma.log.create({
    data: { ...req.body, userSessionId: req.cookies[SESSION_ID_COOKIE_NAME] },
  });

  res.status(200).json({});
};

export default withAllowedMethod('POST', handler);

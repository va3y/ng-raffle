import type { VercelApiHandler } from '@vercel/node';
import { prisma } from '../api-utils/db';
import { withAllowedMethod } from '../api-utils/withAllowedMethod';
import {
  SESSION_ID_COOKIE_NAME,
  withAddCookie,
} from '../api-utils/withAddCookie';

const handler: VercelApiHandler = async (req, res) => {
  await prisma.raffleRecord.update({
    where: { userSessionId: req.cookies[SESSION_ID_COOKIE_NAME] },
    data: req.body,
  });

  res.status(200).json({});
};

export default withAddCookie(withAllowedMethod('POST', handler));

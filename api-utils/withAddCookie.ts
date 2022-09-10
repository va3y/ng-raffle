import { VercelApiHandler } from '@vercel/node';
import { v4 as uuid } from 'uuid';

export const SESSION_ID_COOKIE_NAME = 'session-id';

export function withAddCookie(handler: VercelApiHandler) {
  const returnedFn: VercelApiHandler = (req, res) => {
    if (!req.cookies[SESSION_ID_COOKIE_NAME]) {
      const newCookie = uuid();
      req.cookies[SESSION_ID_COOKIE_NAME] = newCookie;
      res.setHeader('set-cookie', `${SESSION_ID_COOKIE_NAME}=${newCookie}`);
    }
    handler(req, res);
  };

  return returnedFn;
}

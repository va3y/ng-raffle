import { VercelApiHandler } from '@vercel/node';
import { v4 as uuid } from 'uuid';

const SESSION_ID_COOKIE_NAME = 'session-id';

export function withAddCookie(handler: VercelApiHandler) {
  const returnedFn: VercelApiHandler = (req, res) => {
    if (!req.cookies[SESSION_ID_COOKIE_NAME])
      res.setHeader('set-cookie', `${SESSION_ID_COOKIE_NAME}=${uuid()}`);
    handler(req, res);
  };

  return returnedFn;
}

export function withAllowedMethod(method: string, handler: VercelApiHandler) {
  const returnedFn: VercelApiHandler = (req, res) => {
    if (req.method === method) handler(req, res);
  };
  return returnedFn;
}

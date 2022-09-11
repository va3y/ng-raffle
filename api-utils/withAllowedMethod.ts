import type { VercelApiHandler } from '@vercel/node';

export function withAllowedMethod(method: string, handler: VercelApiHandler) {
  const returnedFn: VercelApiHandler = (req, res) => {
    if (req.method === method) handler(req, res);
  };
  return returnedFn;
}

import { VercelApiHandler } from '@vercel/node';
import { withAddCookie, withAllowedMethod } from '../api-utils';

const handler: VercelApiHandler = (req, res) => {
  res.status(200).json({});
};

export default withAddCookie(withAllowedMethod('POST', handler));

import { VercelApiHandler } from '@vercel/node';
import { withAddCookie, withAllowedMethod } from '../api-utils';

export interface GetFormResponse {
  email: string;
  firstName: string;
  familyName: string;
  gender: string;
  dateOfBirth: string;
  profilePhoto: string;
}

const handler: VercelApiHandler = (req, res) => {
  res.status(200).json({
    email: 'valerih333@gmail.com',
    firstName: 'Valery',
    familyName: 'Ivanov',
    gender: 'male',
    dateOfBirth: '2022-09-10T13:00:29.960Z',
    profilePhoto:
      'https://www.camera-rumors.com/wp-content/uploads/2018/02/sony-a7iii-sample-image-3.jpg',
  });
};

export default withAddCookie(withAllowedMethod('GET', handler));

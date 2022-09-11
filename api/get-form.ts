import type { VercelApiHandler } from '@vercel/node';
import { prisma } from '../api-utils/db';
import {
  SESSION_ID_COOKIE_NAME,
  withAddCookie,
} from '../api-utils/withAddCookie';
import { withAllowedMethod } from '../api-utils/withAllowedMethod';
import { RaffleRecord } from '@prisma/client';
import { SCHEMA, Schema } from '../api-utils/formSchema';

export type RaffleRecordDto = Omit<RaffleRecord, 'id' | 'userSessionId'>;

function populateSchemaInitialValues(
  schema: Schema,
  initialValues: RaffleRecordDto
) {
  for (const step of schema.steps) {
    for (const field of step.fields) {
      const code = field.code as keyof RaffleRecordDto;
      if (initialValues[code]) {
        field.value = initialValues[code] || '';
      }
    }
  }

  return schema;
}

const handler: VercelApiHandler = async (req, res) => {
  const response = await prisma.raffleRecord.upsert({
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
      status: true,
    },
  });

  res.status(200).json(populateSchemaInitialValues(SCHEMA, response));
};

export default withAddCookie(withAllowedMethod('GET', handler));

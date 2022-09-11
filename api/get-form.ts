import type { VercelApiHandler } from '@vercel/node';
import { RaffleRecord, RaffleRecordStatus } from '@prisma/client';
import { prisma } from '../api-utils/db';
import {
  SESSION_ID_COOKIE_NAME,
  withAddCookie,
} from '../api-utils/withAddCookie';
import { withAllowedMethod } from '../api-utils/withAllowedMethod';
import { SCHEMA, Schema } from '../api-utils/formSchema';

type RaffleRecordDto = Omit<RaffleRecord, 'id' | 'userSessionId'>;
export interface GetFormResponse {
  schema: Schema;
  recordsCount: number;
  status: RaffleRecordDto['status'];
}

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
  const [raffleRecord, recordsCount] = await Promise.all([
    prisma.raffleRecord.upsert({
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
    }),
    prisma.raffleRecord.count({
      where: { status: RaffleRecordStatus.Submitted },
    }),
  ]);

  const response: GetFormResponse = {
    status: raffleRecord.status,
    schema: populateSchemaInitialValues(SCHEMA, raffleRecord),
    recordsCount,
  };

  res.status(200).json(response);
};

export default withAddCookie(withAllowedMethod('GET', handler));

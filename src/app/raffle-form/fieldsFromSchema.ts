import { Schema } from 'api-utils/formSchema';

export function fieldsFromSchema(schema: Schema) {
  const fields: Record<string, string | null> = {};

  for (const step of schema.steps) {
    for (const field of step.fields) {
      fields[field.code] = field.value;
    }
  }

  return fields;
}

import { Gender } from '@prisma/client';

export enum EFieldType {
  Text = 'text',
  Radio = 'radio',
  Document = 'document',
  Date = 'date',
}

interface BaseField {
  value: string | null;
  label: string;
  code: string;
  placeholder?: string;
  options?: RatioOption[];
}

interface TextField extends BaseField {
  fieldType: EFieldType.Text;
  placeholder: string;
}

interface DateField extends BaseField {
  fieldType: EFieldType.Date;
  placeholder: string;
}

interface DocumentField extends BaseField {
  fieldType: EFieldType.Document;
}

interface RatioOption {
  value: string;
  displayValue: string;
}

interface RadioField extends BaseField {
  fieldType: EFieldType.Radio;

  options: RatioOption[];
}

export type Field = TextField | DateField | DocumentField | RadioField;

export interface Step {
  name: string;
  fields: Field[];
}

export interface Schema {
  steps: Step[];
}

export const SCHEMA: Schema = {
  steps: [
    {
      name: 'Start',
      fields: [
        {
          code: 'email',
          fieldType: EFieldType.Text,
          value: '',
          label: 'Email',
          placeholder: 'Email',
        },
      ],
    },
    {
      name: 'Your personal info',
      fields: [
        {
          code: 'familyName',
          fieldType: EFieldType.Text,
          value: '',
          label: 'Family name',
          placeholder: '',
        },
        {
          code: 'firstName',
          fieldType: EFieldType.Text,
          value: '',
          label: 'First name',
          placeholder: '',
        },
        {
          code: 'dateOfBirth',
          fieldType: EFieldType.Date,
          value: '',
          label: 'Date of birth',
          placeholder: 'mm/dd/yyyy',
        },
        {
          code: 'gender',
          fieldType: EFieldType.Radio,
          value: null,
          label: 'Gender',
          options: [
            {
              value: Gender.Male,
              displayValue: 'Male',
            },
            {
              value: Gender.Female,
              displayValue: 'Female',
            },
          ],
        },
      ],
    },
  ],
};

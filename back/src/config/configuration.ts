import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.string().required(),

  PASSPORT_GOOGLE_CLIENT_ID: Joi.string().required(),
  PASSPORT_GOOGLE_CLIENT_SECRET: Joi.string().required(),
  PASSPORT_GOOGLE_CALLBACK_URL: Joi.string().required(),
});

/** @todo Add client host */
const allowedHosts = ['http://localhost:3000'];

const configuration = () => ({
  port: process.env.PORT,
  ['allowed-hosts']: allowedHosts,
  passport: {
    google: {
      ['client-id']: process.env.PASSPORT_GOOGLE_CLIENT_ID,
      ['client-secret']: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
      ['callback-url']: process.env.PASSPORT_GOOGLE_CALLBACK_URL,
    },
  },
});

const isProd = process.env.NODE_ENV === 'production';

export const config: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: isProd,
  validationSchema,
  load: [configuration],
};

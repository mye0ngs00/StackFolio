import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.string().required(),

  JWT_KEY: Joi.string().required(),

  PASSPORT_GOOGLE_CLIENT_ID: Joi.string().required(),
  PASSPORT_GOOGLE_CLIENT_SECRET: Joi.string().required(),
  PASSPORT_GOOGLE_CALLBACK_URL: Joi.string().required(),
});

/** @todo Add client host */
const allowedHosts = ['http://localhost:3000'];

const configuration = () => ({
  port: process.env.PORT,
  ['allowed-hosts']: allowedHosts,
  ['jwt-key']: process.env.JWT_KEY,
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

export const mailConfig = {
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'ehgks00832@gmail.com',
      clientId:
        '96418407491-3n7egq25r5fij61kikbod46t26cf0ibt.apps.googleusercontent.com',
      clientSecret: '9-bi38s6w254T0nfuTwLNt6V',
      refreshToken:
        '1//04JzxSuhUqhWpCgYIARAAGAQSNwF-L9IrqGMreGSi7TJ6ZAqR3OuqssONa2oBT4Z3gSY_2RVhIBBcHMsJ_YovuCojB1-aPLZSiXI',
    },
  },
};

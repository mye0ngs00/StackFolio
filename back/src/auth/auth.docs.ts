import { AccessTokenDto } from './dto/acess-token.dto';
import { LoginDto } from './dto/login.dto';

export default {
  get: {
    ['google']: {
      operation: {
        description:
          'User will be sent to the Google OAuth server to be authenticated.',
      },
      response: {
        [200]: {
          description:
            'If the user is authenticated, we will send them an `access token`.',
          type: AccessTokenDto,
        },
        [301]: {
          description:
            'If this is the first time a user visits, the user will be redirected to `https://:client/register?code={register_code}&email={users_email}` to fill in their profile.',
        },
      },
    },
    ['verify/:code']: {
      operation: {
        description:
          'Verifies the verification code a user holds in order to authenticate email login.',
      },
      response: {
        [200]: { description: 'User was verified.', type: LoginDto },
        [400]: { description: 'Invalid verification code.' },
      },
    },
  },
  post: {
    ['send-register-mail']: {
      operation: {
        description:
          'Sends a **register email** including a link with a register code and the users email as a query `https://:client/register?code={register_code}&email={users_email}`.',
      },
      response: {
        [201]: { description: 'Mail was successfully sent' },
        [400]: { description: 'A valid email must be provided.' },
      },
    },
    ['send-login-mail']: {
      operation: {
        description:
          'Sends a **login email** including a link with a verification code as a query `https://:client/login?code={verification_code}`.',
      },
      response: {
        [201]: { description: 'Mail was successfully sent' },
        [400]: { description: 'A valid email must be provided.' },
      },
    },
    ['register']: {
      operation: {
        description: 'Create a new user.',
      },
      response: {
        [201]: {
          description:
            'User was successfuly created, and we will send them an `access token`',
          type: AccessTokenDto,
        },
        [400]: { description: 'Invalid inputs provided.' },
        [409]: { description: 'Username conflict.' },
      },
    },
  },
  error: {
    [500]: { description: 'Internal Server Error.' },
  },
};

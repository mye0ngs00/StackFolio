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
          description: 'User is authenticated.',
          type: AccessTokenDto,
        },
        [301]: {
          description:
            'User will be redirected on first visit to `https://:client/register?code={register_code}&email={users_email}` to provide necessary information (username and bio).',
        },
      },
    },
    ['verify/:code']: {
      operation: {
        description:
          'Verifies the verification code a user holds to authenticate email login.',
      },
      response: {
        [200]: { description: 'Verified.', type: LoginDto },
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
        [201]: { description: 'Mail was successfully sent.' },
        [400]: {
          description:
            'Invalid email format, or user with the provided email is already signed up.',
        },
      },
    },
    ['send-login-mail']: {
      operation: {
        description:
          'Sends a **login email** including a link with a verification code as a query `https://:client/login?code={verification_code}`.',
      },
      response: {
        [201]: { description: 'Mail was successfully sent' },
        [400]: {
          description:
            'Invalid email format, or a user with the provided email is not registered.',
        },
      },
    },
    ['register']: {
      operation: {
        description: 'Create a new user.',
      },
      response: {
        [201]: {
          description: 'User was successfuly created.',
          type: AccessTokenDto,
        },
        [400]: {
          description: 'Invalid register code or invalid email format.',
        },
        [409]: { description: 'Username conflict.' },
      },
    },
  },
  error: {
    [500]: { description: 'Internal Server Error.' },
  },
};

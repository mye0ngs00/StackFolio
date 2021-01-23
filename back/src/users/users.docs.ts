import { type } from 'os';
import { UserProfile } from './entity/user-profile.entity';
import { User } from './entity/user.entity';

export default {
  get: {
    ['profile']: {
      operation: {
        description: 'Returns the profile for the user who is requesting.',
      },
      response: {
        [200]: {
          description: 'Returns user profile.',
          type: UserProfile,
        },
        [400]: { description: 'Invalid body schema.' },
      },
    },
  },
  patch: {
    ['profile']: {
      operation: {
        description:
          'Returns the updated profile for the user who is requesting an update.',
      },
      response: {
        [200]: {
          description: 'Returns the updated user profile.',
          type: UserProfile,
        },
        [400]: { description: 'Invalid body schema.' },
      },
    },
  },
  delete: {
    operation: {
      description: 'Delete the user who is requesting.',
    },
    response: {
      [200]: {
        description: 'Returns the infromation of the deleted user.',
        type: User,
      },
    },
  },
};

import { array } from 'joi';
import { type } from 'os';
import { PostInformation } from 'src/posts/entity/post-information.entity';
import { UserProfile } from './entity/user-profile.entity';
import { User } from './entity/user.entity';

export default {
  get: {
    ['profile/:user_id']: {
      operation: {
        description: 'Returns a user profile.',
      },
      response: {
        [200]: {
          description: 'Returns a user profile.',
          type: UserProfile,
        },
        [400]: { description: 'Invalid body schema.' },
      },
    },
    ['followers/:user_id']: {
      operation: {
        description: 'Returns the people who are following a user.',
      },
      response: {
        [200]: {
          description: 'The users who are following a user.',
          type: User,
          isArray: true,
        },
        [400]: { description: 'User does not exist' },
      },
    },
    ['following/user_id']: {
      operation: {
        description: 'Returns the users who a user is following.',
      },
      response: {
        [200]: {
          description: 'The users a user is following.',
          type: User,
          isArray: true,
        },
        [400]: { description: 'User does not exist' },
      },
    },
    ['favorites']: {
      operation: {
        description: 'Returns a list of posts that a user marked as favorite.',
      },
      response: {
        [200]: {
          description: 'A list of posts a user marked as favorite.',
          type: PostInformation,
          isArray: true,
        },
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
  unauthorized: {
    description: 'Token is missing, or the token is invalid.',
  },
};

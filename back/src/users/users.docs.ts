import { PostInformation } from 'src/posts/entity/post-information.entity';
import { Favorite } from './entity/user-favorite.entity';
import { UserProfile } from './entity/user-profile.entity';
import { User } from './entity/user.entity';

export default {
  get: {
    ['users']: {
      operation: {
        description: 'Returns a user lists.',
      },
      response: {
        [200]: {
          description: 'Returns a user lists.',
          type: User,
        },
        [400]: { description: 'User does not exist' },
      },
    },
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
    ['followings/:user_id']: {
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
    ['following/:user_id']: {
      operation: {
        description: '다른 유저를 팔로잉 하기',
      },
      response: {
        [200]: {
          description: '다른 유저를 팔로잉 하기.',
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
          type: Favorite,
          isArray: true,
        },
      },
    },
    ['favorite/:post_id']: {
      operation: {
        description: 'favorite 추가하기',
      },
      response: {
        [200]: {
          description: 'favorite 추가하기',
          type: Favorite,
          isArray: true,
        },
        [400]: {
          description: 'A list of posts a user marked as favorite.',
          type: Favorite,
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
    ['user']: {
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
    ['following/:user_id']: {
      operation: { description: '언팔하기' },
      response: {
        [200]: {
          description: '언팔하기',
          type: User,
        },
        [400]: {},
      },
    },
    ['follower/:user_id']: {
      operation: {
        description: '팔로워 끊기',
      },
      response: {
        [200]: { description: '팔로워 끊기', type: User },
        [400]: {},
      },
    },
    ['favorite/:favorite_id']: {
      operation: {
        description: 'favorite 삭제하기',
      },
      response: {
        [200]: { description: 'favorite 삭제하기', type: Favorite },
        [400]: {},
      },
    },
  },
  unauthorized: {
    description: 'Token is missing, or the token is invalid.',
  },
};

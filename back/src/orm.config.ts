import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from './entity';

const inContainer = Boolean(process.env.IN_CONTAINER);
const isDev = process.env.NODE_ENV === 'development';

/**
 * TypeORM connection options
 * @constant
 * @type {TypeOrmModuleOptions}
 * @description Sets the connection options based on current enviroment
 */
export const config: TypeOrmModuleOptions = inContainer
  ? {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      logging: isDev,
      entities,
    }
  : {
      type: 'postgres',
      username: 'postgres',
      password: 'root',
      port: 5432,
      host: '127.0.0.1',
      database: 'nest-typeorm',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    };

// GRANT ALL PRIVILEGES ON DATABASE velog to velog;

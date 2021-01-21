import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setSwagger } from './set-swagger';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Load variables from config serivce
  const $ = app.get(ConfigService);
  const allowedHosts = $.get('allowed-hosts');
  const port = $.get('port');

  app.set('trust proxy', 1);
  app.enableCors({ credentials: true, origin: allowedHosts });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (isProd) {
    app.use(helmet());
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );
    // Starts listening for shutdown hooks
    // https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown
    app.enableShutdownHooks();
  }

  if (isDev) {
    setSwagger(app);
  }

  await app.listen(port);

  new Logger('main').verbose(
    `🚀 Application is running on: ${await app.getUrl()}`,
  );
}
bootstrap();

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

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

  const port = +process.env.PORT || 3000;

  await app.listen(port);

  new Logger('main').verbose(
    `🚀 Application is running on: ${await app.getUrl()}`,
  );
}
bootstrap();

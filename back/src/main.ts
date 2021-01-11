import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.PORT || 3000;

  if (isProd) {
    // Starts listening for shutdown hooks
    // https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown
    app.enableShutdownHooks();
  }

  await app.listen(port);
  console.log(`🚀 Server is running on: ${await app.getUrl()}`);
}
bootstrap();

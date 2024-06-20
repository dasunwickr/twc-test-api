import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/corsOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // CORS config - ./src/config/corsOptions.ts
  app.enableCors(corsOptions);

  await app.listen(3000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  await app.listen(process.env.PORT ?? 3000);


  const logger = new Logger();
  logger.log(`Server running at ${await app.getUrl()}`);
}

bootstrap();

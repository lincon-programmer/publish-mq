import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { test_mq } from './mq-conect/brocker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  test_mq();
}
bootstrap();

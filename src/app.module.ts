import { PublishModule } from './publish/publish.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PublishModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

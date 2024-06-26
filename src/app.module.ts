import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [AuthModule, TreeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

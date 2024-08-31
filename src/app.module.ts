import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WebControllersModule } from './infra/ports/http/web-controllers.module';

@Module({
  imports: [WebControllersModule, ConfigModule.forRoot(), HttpModule],
  controllers: [],
  providers: [],
})
export class AppWithoutConfigModule {}

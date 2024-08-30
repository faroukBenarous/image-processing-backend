import { NestFactory } from '@nestjs/core';
import {Logger, Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AppWithoutConfigModule} from "./app.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AppWithoutConfigModule,
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
async function bootstrap() {
  const logger = new Logger('bootstrap()');
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const httpPort = configService.getOrThrow<number>('HTTP_PORT');

  app.enableShutdownHooks();

  logger.log(`Starting HTTP service [${httpPort}]...`);
  await app.listen(httpPort);
}
bootstrap().then();

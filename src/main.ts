import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: ['error', 'warn', 'log', 'verbose', 'debug'] },
  );
  const configService = app.get<ConfigService<Env>>(ConfigService);
  const port = configService.get<number>('PORT', { infer: true });
  await app.listen(port ?? 3333);
}
bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.safeParse(env),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

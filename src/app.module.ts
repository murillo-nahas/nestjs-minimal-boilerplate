import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { CatsModule } from './modules/cats/cats.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.safeParse(env),
    }),
    CatsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

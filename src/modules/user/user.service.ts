import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor() {}

  async createUser() {
    return 'Hello World';
  }
}

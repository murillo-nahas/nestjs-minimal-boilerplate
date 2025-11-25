import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCatDTO } from './schemas/create-cat.dto';
import { CatDTO } from './schemas/cat-response.dto';
import { UpdateCatDTO } from './schemas/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CatDTO[]> {
    return await this.prisma.cat.findMany();
  }

  async findOne(id: string): Promise<CatDTO> {
    const cat = await this.prisma.cat.findUnique({
      where: {
        id,
      },
    });

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    return cat;
  }

  async create(body: CreateCatDTO): Promise<CatDTO> {
    return await this.prisma.cat.create({
      data: body,
    });
  }

  async update(id: string, body: UpdateCatDTO): Promise<CatDTO> {
    return await this.prisma.cat.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.cat.delete({
      where: { id },
    });
  }
}

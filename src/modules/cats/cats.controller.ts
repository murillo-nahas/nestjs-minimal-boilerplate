import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDTO } from './schemas/cat-response.dto';
import { createCatDTO, type CreateCatDTO } from './schemas/create-cat.dto';
import { updateCatDTO, type UpdateCatDTO } from './schemas/update-cat.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async find(): Promise<CatDTO[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<CatDTO> {
    return this.catsService.findOne(id);
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createCatDTO)) body: CreateCatDTO,
  ): Promise<CatDTO> {
    return this.catsService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ZodValidationPipe(updateCatDTO)) body: UpdateCatDTO,
  ): Promise<CatDTO> {
    return this.catsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.catsService.delete(id);
  }
}

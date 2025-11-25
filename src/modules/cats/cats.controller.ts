import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDTO, CatResponseDTO } from './schemas/cat-response.dto';
import {
  createCatDTO,
  type CreateCatDTO,
  CreateCatSwaggerDTO,
} from './schemas/create-cat.dto';
import {
  updateCatDTO,
  type UpdateCatDTO,
  UpdateCatSwaggerDTO,
} from './schemas/update-cat.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [CatResponseDTO],
    description: 'Returns all cats',
  })
  async find(): Promise<CatDTO[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: CatResponseDTO,
    description: 'Returns a single cat',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<CatDTO> {
    return this.catsService.findOne(id);
  }

  @Post()
  @ApiBody({
    type: CreateCatSwaggerDTO,
    description: 'Cat data to create',
  })
  @ApiResponse({
    status: 201,
    type: CatResponseDTO,
    description: 'Cat created successfully',
  })
  async create(
    @Body(new ZodValidationPipe(createCatDTO)) body: CreateCatDTO,
  ): Promise<CatDTO> {
    return this.catsService.create(body);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateCatSwaggerDTO,
    description: 'Cat data to update',
  })
  @ApiResponse({
    status: 200,
    type: CatResponseDTO,
    description: 'Cat updated successfully',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ZodValidationPipe(updateCatDTO)) body: UpdateCatDTO,
  ): Promise<CatDTO> {
    return this.catsService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Cat deleted successfully',
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.catsService.delete(id);
  }
}

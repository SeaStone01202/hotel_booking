import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Created successfully' })
  create(@Body(ValidationPipe) body: CreateUserDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all with pagination' })
  findAll(@Query(ValidationPipe) pagination: PaginationDto) {
    return this.service.findAll(pagination);
  }

  @Get('filter/search')
  @ApiOkResponse({ description: 'Get with filter and search' })
  findWithFilter(@Query(ValidationPipe) filter: FilterUserDto) {
    return this.service.findWithFilter(filter);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Updated successfully' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) body: UpdateUserDto,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

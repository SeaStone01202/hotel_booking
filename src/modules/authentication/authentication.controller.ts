import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { FilterAuthenticationDto } from './dto/filter-authentication.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Created successfully' })
  create(@Body(ValidationPipe) body: CreateAuthenticationDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all with pagination' })
  findAll(@Query(ValidationPipe) pagination: PaginationDto) {
    return this.service.findAll(pagination);
  }

  @Get('filter/search')
  @ApiOkResponse({ description: 'Get with filter and search' })
  findWithFilter(@Query(ValidationPipe) filter: FilterAuthenticationDto) {
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
    @Body(ValidationPipe) body: UpdateAuthenticationDto,
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

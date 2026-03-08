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
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { FilterTenantDto } from './dto/filter-tenant.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Created successfully' })
  create(@Body(ValidationPipe) body: CreateTenantDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all with pagination' })
  findAll(@Query(ValidationPipe) pagination: PaginationDto) {
    return this.service.findAll(pagination);
  }

  @Get('filter/search')
  @ApiOkResponse({ description: 'Get with filter and search' })
  findWithFilter(@Query(ValidationPipe) filter: FilterTenantDto) {
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
    @Body(ValidationPipe) body: UpdateTenantDto,
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

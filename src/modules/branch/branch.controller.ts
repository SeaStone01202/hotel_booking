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
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { FilterBranchDto } from './dto/filter-branch.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly service: BranchService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Created successfully' })
  create(@Body(ValidationPipe) body: CreateBranchDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all with pagination' })
  findAll(@Query(ValidationPipe) pagination: PaginationDto) {
    return this.service.findAll(pagination);
  }

  @Get('filter/search')
  @ApiOkResponse({ description: 'Get with filter and search' })
  findWithFilter(@Query(ValidationPipe) filter: FilterBranchDto) {
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
    @Body(ValidationPipe) body: UpdateBranchDto,
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

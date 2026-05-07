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
import { PaginationDto } from 'src/core/common/dto/pagination.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('register')
  async register(@Body(ValidationPipe) data: CreateAuthenticationDto) {
    return this.service.register(data);
  }
}

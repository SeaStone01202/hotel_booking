import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { Auth } from 'src/core/decorators/auth.decorator';
import { RequireTenant } from 'src/core/decorators/tenant.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Auth()
  @RequireTenant()
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return this._service.findAll(pagination);
  }
}

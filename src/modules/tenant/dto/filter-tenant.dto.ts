import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';

export class FilterTenantDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}

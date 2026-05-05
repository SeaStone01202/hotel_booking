import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';

export class FilterAuthenticationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}

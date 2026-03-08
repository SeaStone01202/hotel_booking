import { IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @IsString()
  sort?: string = 'createdAt';

  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'DESC';
}

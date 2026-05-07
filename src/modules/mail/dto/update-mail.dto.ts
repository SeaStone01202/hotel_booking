import { IsOptional, IsString } from 'class-validator';

export class UpdateMailDto {
  @IsOptional()
  @IsString()
  name?: string;
}

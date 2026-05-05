import { IsOptional, IsString } from 'class-validator';

export class UpdateAuthenticationDto {
  @IsOptional()
  @IsString()
  name?: string;
}

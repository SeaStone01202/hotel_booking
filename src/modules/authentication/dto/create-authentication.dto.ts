import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthenticationDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class VerifyRegisterOtpRequestDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  otp!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-+]+$/, {
    message: 'Password must contain letters and numbers',
  })
  password!: string;

  @MinLength(3)
  fullName!: string;

  @MinLength(3)
  tenantName!: string;

  @MinLength(3)
  @Matches(/^[a-z0-9]+$/, {
    message: 'Tenant subdomain must be lowercase alphanumeric',
  })
  tenantSubdomain!: string;

  @Matches(/^\d{10}$/, {
    message: 'Phone number must be exactly 10 digits',
  })
  phone!: string;
}

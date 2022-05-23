import { IsEmail, IsString, MaxLength } from 'class-validator';
import { User } from '../entity/user.entity';

export class SignInDto extends User {
  @MaxLength(30)
  @IsEmail()
  email: string;

  @MaxLength(30)
  @IsString()
  password: string;
}

export class SignUpDto extends User {
  @MaxLength(30)
  @IsEmail()
  email: string;

  @MaxLength(10)
  @IsString()
  name: string;

  @MaxLength(30)
  @IsString()
  password: string;
}

export class JwtDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

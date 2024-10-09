import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

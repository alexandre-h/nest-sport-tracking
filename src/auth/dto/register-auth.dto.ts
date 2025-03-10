import { IsString, IsEmail, Length } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 50)
  password: string;
}
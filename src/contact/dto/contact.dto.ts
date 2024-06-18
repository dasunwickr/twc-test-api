import { Gender, User } from '@prisma/client';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  user_id: number;
}

import type { Gender } from '@prisma/client';
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
  phoneNumber: string;

  @IsNotEmpty()
  userId: number;
}

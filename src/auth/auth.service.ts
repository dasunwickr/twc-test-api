import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    //generate the password hash

    const hash = await argon2.hash(dto.password);

    //save the user to the database

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password_hash: hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('The email is already taken');
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //throw an error if the user doesn't exist
    if (!user) {
      throw new ForbiddenException('Invalid credentails.');
    }

    //compare the password
    const isPasswordValid = await argon2.verify(
      user.password_hash,
      dto.password,
    );

    //throw an error if the password is incorrect
    if (!isPasswordValid) {
      if (!user) {
        throw new ForbiddenException('Invalid credentails.');
      }
    }

    //return the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}

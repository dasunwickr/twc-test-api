import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [PrismaModule, UserModule, ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

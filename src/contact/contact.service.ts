import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}
  create(createContactDto: ContactDto) {
    return this.prisma.contact.create({
      data: createContactDto,
    });
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: ContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}

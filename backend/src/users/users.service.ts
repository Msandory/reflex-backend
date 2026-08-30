import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  create(data: Prisma.usersCreateInput) {
    return this.prisma.users.create({ data });
  }

  update(id: string, data: Prisma.usersUpdateInput) {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({ where: { id } });
  }
}

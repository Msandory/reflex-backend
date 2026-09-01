import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
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

  async create(data: Prisma.usersCreateInput) {
    if (data.password_hash) {
      data.password_hash = await bcrypt.hash(data.password_hash, 10);
    }
    return this.prisma.users.create({ data });
  }

 async update(id: string, data: Prisma.usersUpdateInput) {
  if (typeof data.password_hash === 'string') {
    data.password_hash = await bcrypt.hash(data.password_hash, 10);
  }
  return this.prisma.users.update({
    where: { id },
    data,
  });
}

  remove(id: string) {
    return this.prisma.users.delete({ where: { id } });
  }
}
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProjectDto: Prisma.ProjectCreateInput) {
    return await this.databaseService.project.create({
      data: createProjectDto,
    });
  }

  async findAll() {
    return this.databaseService.project.findMany({
      include: { employees: true },
    });
  }

  async findOne(id: number) {
    return this.databaseService.project.findUnique({ where: { id } });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Prisma, Role } from '@prisma/client';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { EmployeesService } from './employees.service';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body() createEmployee: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployee);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(
      `Request for All Employees\t${ip}`,
      EmployeesController.name,
    );
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployee: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployee);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}

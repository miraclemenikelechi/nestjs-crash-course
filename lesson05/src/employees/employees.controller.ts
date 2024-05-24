import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
        return this.employeesService.create(createEmployeeDto);
    }

    @Get()
    findAll(@Query("gender") gender?: "male" | "female" | "shemale") {
        return this.employeesService.findAll(gender);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.employeesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
        return this.employeesService.update(+id, updateEmployeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.employeesService.remove(+id);
    }
}

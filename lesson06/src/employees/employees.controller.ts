import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Ip } from '@nestjs/common';
// import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Gender, Prisma } from '@prisma/client';
import { EmployeesService } from './employees.service';
import { LoggerService } from 'src/logger/logger.service';

// to skip throttling for the entire route
// @SkipThrottle()
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }
    private readonly logger = new LoggerService(EmployeesController.name); // to log from a controller

    @Post()
    create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
        return this.employeesService.create(createEmployeeDto);
    }
    // to skip a particular route
    // @SkipThrottle({ default: false })
    @Get()
    findAll(@Ip() ip: string, @Query("gender") gender?: Gender) {
        this.logger.log(`request from ${ip}`, EmployeesController.name); // to log from a service
        return this.employeesService.findAll(gender);
    }
    // to override the default setting of rate limit
    // @Throttle({ short: { ttl: 1000, limit: 1 } })
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

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
    constructor(private readonly databaseService: DatabaseService) { }

    async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
        return this.databaseService.employee
            .create({
                data: createEmployeeDto
            });
    }

    async findAll(gender?: "male" | "female" | "shemale") {
        if (gender) return this.databaseService.employee
            .findMany({
                where: { gender }
            });

        return this.databaseService.employee.findMany();
    }

    async findOne(id: number) {
        return this.databaseService.employee
            .findUnique({
                where: { id }
            });
    }

    async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
        return this.databaseService.employee
            .update({
                where: { id },
                data: updateEmployeeDto
            });
    }

    async remove(id: number) {
        return this.databaseService.employee.delete({
            where: { id }
        });
    }
}

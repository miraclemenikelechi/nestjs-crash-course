import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserDTO, UserUpdateDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    async allUsers(@Query("gender") gender?: "male" | "female" | "shemale"): Promise<UserDTO[]> {
        return await this.usersService
            .getAllUsers(gender.toLocaleLowerCase() as "male" | "female" | "shemale");
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<UserDTO> {
        return await this.usersService
            .findOneUser(id);
    }

    @Post("new")
    async create(@Body(ValidationPipe) user: UserDTO): Promise<UserDTO> {
        return await this.usersService
            .createUser(user);
    }

    @Patch(":id")
    async updateUser(
        @Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UserUpdateDTO
    ): Promise<UserDTO> {
        return await this.usersService
            .updateUser(id, userUpdate);
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<UserDTO> {
        return await this.usersService
            .deleteUser(id);
    }

}

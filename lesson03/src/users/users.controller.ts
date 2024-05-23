import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserDataT, UserT } from "./user.types";
import { UsersService } from './users.service';

// this is the root route: /api/v1/users
@Controller('users') // api/users
export class UsersController {
    /**
     *  GET /users
     *  GET /users/:id
     * 
     *  POST /users
     *  POST /users/:id
     *  POST /users/:id
     */

    constructor(private readonly usersService: UsersService) { }

    @Get() // get all users
    // async findAll() { // route: /users

    // for query params
    async allUsers(@Query("gender") gender?: "male" | "female"): Promise<UserT[]> {
        return await this.usersService.getAllUsers(gender);
    }

    // so it better be here than down there
    @Get("interns") // get all interns
    findAllInterns() { // route: /users/interns
        return [];
    }

    @Get(":id") // get one user
    async findOne(@Param("id") id: string): Promise<UserT> { // route: /users/:id
        return await this.usersService.findOneUser(+id); // ? look up unary plus ?
    }

    // incase of other routes, order matters
    // @Get("interns") // get all interns
    // findAllInterns() {
    //     return [];
    // }

    @Post("new") // create a user
    async create(@Body() user: UserDataT): Promise<UserT> { // create
        return await this.usersService.createUser(user);
    }

    @Patch(":id")
    async updateUser(@Param("id") id: string, @Body() userUpdate: UserDataT): Promise<UserT> { // update a particular user
        return await this.usersService.updateUser(+id, userUpdate);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<UserT> { // delete a particular user
        return await this.usersService.deleteUser(+id);
    }
}

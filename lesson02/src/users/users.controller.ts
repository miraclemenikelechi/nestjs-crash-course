import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

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


    @Get() // get all users
    // async findAll() { // route: /users

    // for query params
    allUsers(@Query("role") role?: "admin") {
        return [role];
    }

    // so it better be here than down there
    @Get("interns") // get all interns
    findAllInterns() { // route: /users/interns
        return [];
    }

    @Get(":id") // get one user
    async findOne(@Param("id") id: string) { // route: /users/:id
        return { id };
    }

    // incase of other routes, order matters
    // @Get("interns") // get all interns
    // findAllInterns() {
    //     return [];
    // }

    @Post() // create a user
    async create(@Body() user: object) { // create
        return user;
    }

    @Patch(":id")
    async updateUser(@Param("id") id: string, @Body() userUpdate: object) { // update a particular user
        return { id, ...userUpdate };
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string) { // delete a particular user
        return { id };
    }
}

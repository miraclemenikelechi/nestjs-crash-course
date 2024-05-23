import { Injectable } from '@nestjs/common';
import { UserDataT, UserT } from "./user.types";

@Injectable()
export class UsersService {

    private users: UserT[] = [
        {
            id: 1,
            name: "alice",
            gender: "female"
        },
        {
            id: 2,
            name: "bob",
            gender: "male"
        },
        {
            id: 3,
            name: "catherine",
            gender: "female"
        },
        {
            id: 4,
            name: "dave",
            gender: "male"
        },
    ];

    async getAllUsers(gender?: "male" | "female"): Promise<UserT[]> {
        if (gender) {
            return this.users.filter(function (user): boolean { return user.gender === gender; });
        }

        return this.users;
    }

    async findOneUser(id: number): Promise<UserT> {
        return this.users.find(function (user) { return user.id === id; });
    }

    async createUser(user: UserDataT): Promise<UserT> {
        const usersByHighestId = [...this.users].sort(function (a, b) { return Number(b.id) - Number(a.id); });

        const newUser = {
            id: Number(usersByHighestId[0].id) + 1,
            ...user
        };

        this.users.push(newUser);
        return newUser;
    }

    async updateUser(id: number, updateUserRequest: UserDataT): Promise<UserT> {
        this.users = this.users.map(function (user) {
            if (user.id === id) return { ...user, ...updateUserRequest };

            return user;
        });

        return this.findOneUser(id);
    }

    async deleteUser(id: number): Promise<UserT> {
        const removedUser = this.findOneUser(id);

        this.users = this.users.filter(function (user) { return user.id !== id; });

        return removedUser;
    }
}


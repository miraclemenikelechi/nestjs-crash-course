import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO, UserUpdateDTO } from './users.dto';

@Injectable()
export class UsersService {

    private users: UserDTO[] = [
        {
            id: 1, name: "alice", gender: "female", email: "a@a.com"
        },
        {
            id: 2, name: "bob", gender: "male", email: "b@b.com"
        },
        {
            id: 3, name: "catherine", gender: "female", email: "c@c.com"
        },
        {
            id: 4, name: "dave", gender: "male", email: "d@d.com"
        },
        {
            id: 5, name: "erica", gender: "shemale", email: "e@e.com"
        }
    ];

    async getAllUsers(gender?: "male" | "female" | "shemale"): Promise<UserDTO[]> {
        if (gender) {
            const usersByGender: UserDTO[] = this.users
                .filter(function (user): boolean {
                    return user.gender === gender;
                });

            if (!usersByGender.length) throw new NotFoundException("User not found");

            return usersByGender;
        }

        return this.users;
    }

    async findOneUser(id: number): Promise<UserDTO> {
        const user = this.users
            .find(function (user): boolean {
                return user.id === id;
            });

        if (!user) throw new NotFoundException("User not found");

        return user;
    }

    async createUser(user: UserDTO): Promise<UserDTO> {
        const usersByHighestId: UserDTO[] = [...this.users]
            .sort(function (a, b): number {
                return Number(b.id) - Number(a.id);
            });

        const newUser: UserDTO = {
            id: Number(usersByHighestId[0].id) + 1,
            ...user
        };

        this.users.push(newUser);
        return newUser;
    }

    async updateUser(id: number, updateUserRequest: UserUpdateDTO): Promise<UserDTO> {
        this.users = this.users
            .map(function (user): UserDTO {
                if (user.id === id) return {
                    ...user, ...updateUserRequest
                };

                return user;
            });

        return this.findOneUser(id);
    }

    async deleteUser(id: number): Promise<UserDTO> {
        const removedUser = this.findOneUser(id);

        this.users = this.users.filter(function (user) { return user.id !== id; });

        return removedUser;
    }

}
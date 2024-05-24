import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

class UserBaseDTO {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsEnum(["male", "female", "shemale"], { message: "Gender must be male, female or shemale" })
    readonly gender: "male" | "female" | "shemale";

}

export class UserUpdateDTO extends PartialType(UserBaseDTO) { }

export class UserDTO extends UserBaseDTO {

    readonly id: number | string;

}
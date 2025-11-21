import { IsEmail, IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    username: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    status: string;
}
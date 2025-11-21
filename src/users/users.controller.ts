import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    users = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
    ]
    //http://localhost:3000/users?status=active
    //http://localhost:3000/users?status=inactive
    @Get()
    getAllUsers(@Query() query: string) {
        console.log(query);
        if (!query['status']) {
            return this.users;
        }
        let filtredUsers=  this.users.filter(user => user.status === query['status']);
        return filtredUsers;
    }
    //http://localhost:3000/users/queryUser?id=3
    @Get('/queryUser')
    getUserById(@Query('id') id: number) {
        return this.users.find(user => user.id === Number(id));
    }
    //http://localhost:3000/users/details/2
    @Get('/details/:id')
    getUserDetails(@Param('id') id: number) {
        return this.users.find(user => user.id === Number(id));
    }

    @Post()
    createUser(@Body() user: CreateUserDTO, @Headers('authorisation') token: string) {
        console.log(user);
        console.log(token);
        let newId = new Date();
        let newUser={id: newId.getTime(), ...user};
        this.users.push(newUser);
        return newUser;
    }

    @Put('/:id')
    updateUser(@Param('id') id: number, @Body() user: CreateUserDTO) {
        let userIndex = this.users.findIndex(u => u.id === Number(id));
        this.users[userIndex] = { id: Number(id), ...user };
        return this.users[userIndex];
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: number) {
        let userIndex = this.users.findIndex(u => u.id === Number(id));
        let deletedUser = this.users[userIndex];
        this.users.splice(userIndex, 1);
        return deletedUser;
    }
    
}

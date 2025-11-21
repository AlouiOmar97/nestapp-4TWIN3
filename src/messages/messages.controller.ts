import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {
        console.log("Message List");
        return "List of Messages";
    }
    @Get('/:id')
    getMessageById(@Param('id') id: string) {
        console.log("Get Message by ID: "+ id);
        return "Message Details: " + id;
    }
    @Post()
    createMessage(@Body() body: CreateMessageDTO) {
        console.log("Create Message");
        console.log(body.content);
        return body;
    }
}

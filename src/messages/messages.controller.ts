import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    //messagesService: MessagesService
    constructor(private readonly messagesService: MessagesService) {
    //this.messagesService = new MessagesService()
    }
    @Get()
    listMessages() {
        console.log("Message List");
        const messages = this.messagesService.findAll()
        //return "List of Messages";
        return messages;
        //
    }
    /*@Get('/:id')
    getMessageById(@Param('id') id: string) {
        console.log("Get Message by ID: "+ id);
        const message = this.messagesService.findOne(id)
        //return "Message Details: " + id;
        return message;
    }*/
   @Get("/:id")
    async getMessage(@Param("id") id: string) {
    const message = await this.messagesService.findOne(id)
    if (!message) {
    throw new NotFoundException("Le message n'existe pas")
    }
    return message
    }
    @Post()
    createMessage(@Body() body: CreateMessageDTO) {
        console.log("Create Message");
        console.log(body.content);
        this.messagesService.create(body.content,body.status)
        return body;
    }
    @Put("/:id")
    updateMessage(@Param("id") id: string,@Body() body: Partial<CreateMessageDTO>){
        this.messagesService.update(id,body);
        return body;
    }
    @Delete("/:id")
    deleteMessage(@Param("id") id: string){
        this.messagesService.delete(id);
    }
}

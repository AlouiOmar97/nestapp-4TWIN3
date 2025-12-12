import { MessagesMongoService } from './messages-mongo/messages-mongo.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { SerializerInterceptor } from 'src/interceptors/serializer.interceptor';

//@UseInterceptors(ClassSerializerInterceptor)
//@UseInterceptors(SerializerInterceptor)
@Controller('messages')
export class MessagesController {
    //messagesService: MessagesService
    constructor(private readonly messagesService: MessagesService,
        private readonly messagesMongoService: MessagesMongoService
    ) {
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

    @Get('/seen')
    getSeenMessages() {
        console.log("Get Seen Messages");
        return this.messagesMongoService.getAllSeenMessages();
    }

    @Get('/summaries')
    getMessageSummaries() {
        console.log("Get Message Summaries");
        return this.messagesMongoService.getMessageSummaries();
    }

    @Get('/recent-seen/:date')
    getRecentSeenMessages(@Param('date') dateStr: string) {
        console.log("Get Recent Seen Messages since: " + dateStr);
        const date = new Date(dateStr);
        return this.messagesMongoService.getRecentSeenMessages(date);
    }

    @Get('/paginated/:skip/:take')
    getPaginatedMessages(@Param('skip') skipStr: string, @Param('take') takeStr: string) {
        console.log("Get Paginated Messages: skip=" + skipStr + ", take=" + takeStr);
        const skip = parseInt(skipStr, 10);
        const take = parseInt(takeStr, 10);
        return this.messagesMongoService.getPaginatedMessages(skip, take);
    }

    @Get('/count/:status')
    async countSeenMessages(@Param('status') status: string) {
        console.log("Count Messages with status: " + status);
        const [messages, count] = await this.messagesMongoService.countSeenMessages(status);
        return { count, messages };
    }

    @Get('/count-by-status')
    async countMessagesByStatus() {
        console.log("Count Messages by Status");
        return this.messagesMongoService.countMessagesByStatus();
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
        return this.messagesService.create(body.content,body.status);
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

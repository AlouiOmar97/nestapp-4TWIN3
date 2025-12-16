import {
WebSocketGateway,
SubscribeMessage,
MessageBody,
WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from '../messages.service';

@WebSocketGateway()
export class ChatGateway {
@WebSocketServer()
server: Server;
constructor(private readonly messagesService: MessagesService) {}
@SubscribeMessage('send_message')
async handleMessage(@MessageBody() data: any) {
const message = await this.messagesService.create(data.content,
'sent');
this.server.emit('receive_message', message);
return message;
}
}
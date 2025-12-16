import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesMongoService } from './messages-mongo/messages-mongo.service';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, MessagesMongoService, ChatGateway],
})
export class MessagesModule {}

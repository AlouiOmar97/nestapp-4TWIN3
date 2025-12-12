import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../message.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MessagesMongoService {
    constructor(@InjectRepository(Message) private readonly messageRepository: MongoRepository<Message>){}

    async getAllSeenMessages() {
    return await this.messageRepository.find({
        where: { status: "seen" } });
    }

    async getMessageSummaries() {
    return await this.messageRepository.find({
    select: ["id", "content"],
    });
    }

    async getRecentSeenMessages(date: Date) {
    return await this.messageRepository.find({
        where: { date: { $gt: date }, status: "seen" },
    });
    }

    async getPaginatedMessages(skip: number, take: number) {
    return await this.messageRepository.find({
        order: { date: "DESC" },
        skip,
        take,
    });
    }

    async countSeenMessages(status: string): Promise<[Message[], number]> {
    return await this.messageRepository.findAndCount({
        where: { status: status }
    });
    }

    async countMessagesByStatus() {
    return await this.messageRepository.aggregate([
    {
        $group: {
        _id: "$status",
        count: { $sum: 1 }
    }
    }
    ]).toArray();
    }



}

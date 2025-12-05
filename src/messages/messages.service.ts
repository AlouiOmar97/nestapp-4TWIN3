import { Injectable, NotFoundException } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessagesService {
//messagesRepository: MessagesRepository
constructor(@InjectRepository(Message) private readonly messagesRepository: Repository<Message>) {
//constructor(private readonly messagesRepository: MessagesRepository) {
//constructor() {
//this.messagesRepository = new MessagesRepository()
}
findOne(id: string) {
//return this.messagesRepository.findOne(id)
return this.messagesRepository.findOneById(id)

}

findAll() {
//return this.messagesRepository.findAll()
return this.messagesRepository.find()

}

async create(content: string,status: string) {
//return this.messagesRepository.create(content)
let message = this.messagesRepository.create({content,status});
await this.messagesRepository.save(message);
//this.messagesRepository.de
console.log(message);

return message;
//this.messagesRepository.insert({content,status});
}
async update (id :string,message:Partial<Message>)
{
    const msg=await this.findOne(id);
    if (!msg)
        throw new NotFoundException("message not found");
    Object.assign(msg,message);
    await this.messagesRepository.save(msg);

}
async delete (id : string ){
    const msg=await this.findOne(id);
if(!msg)
    throw new NotFoundException("message not found ");
    await this.messagesRepository.remove(msg);
}
}
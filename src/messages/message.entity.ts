import { Exclude } from 'class-transformer';
import { Entity, ObjectIdColumn, ObjectId, Column, BeforeInsert, AfterInsert } from 'typeorm';

@Entity()
export class Message {
@ObjectIdColumn()
@Exclude()
_id: ObjectId;
@Column()
content: string;
@Column()
@Exclude()
status: string;
@Column()
date: Date;


@BeforeInsert()
setDate() {
    console.log("Setting the date");
    this.date = new Date();
}

@AfterInsert()
logInsert() {
    console.log("Message inserted with id: " + this._id);
}

}
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Message {
@ObjectIdColumn()
_id: ObjectId;
@Column()
content: string;
@Column()
status: string;
@Column({ default: () => "CURRENT_TIMESTAMP" })
date: Date;
}
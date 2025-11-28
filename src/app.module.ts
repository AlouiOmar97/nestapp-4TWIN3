import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/message.entity';

@Module({
  imports: [MessagesModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb', // Déclare que c'est MongoDB
      host: 'localhost', // L'adresse de ton serveur MongoDB
      port: 27017, // Le port de MongoDB
      database: 'test', // Nom de la base de données
      //useNewUrlParser: true, // Option de MongoDB
      //useUnifiedTopology: true, // Option de MongoDB
      entities: [Message], // Liste des entités
      synchronize: true, // Synchroniser les entités avec la BD
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { MessagesMongoService } from './messages-mongo.service';

describe('MessagesMongoService', () => {
  let service: MessagesMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesMongoService],
    }).compile();

    service = module.get<MessagesMongoService>(MessagesMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

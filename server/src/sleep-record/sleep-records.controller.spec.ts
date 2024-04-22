import { Test, TestingModule } from '@nestjs/testing';
import { SleepRecordsController } from './sleep-records.controller';
import { SleepRecordsService } from './sleep-records.service';

describe('SleepRecordController', () => {
  let controller: SleepRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SleepRecordsController],
      providers: [SleepRecordsService],
    }).compile();

    controller = module.get<SleepRecordsController>(SleepRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

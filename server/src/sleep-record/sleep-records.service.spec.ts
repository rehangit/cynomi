import { Test, TestingModule } from '@nestjs/testing';
import { SleepRecordsService } from './sleep-records.service';

describe('SleepRecordsService', () => {
  let service: SleepRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SleepRecordsService],
    }).compile();

    service = module.get<SleepRecordsService>(SleepRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

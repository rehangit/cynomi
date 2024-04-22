import { Module } from '@nestjs/common';
import { SleepRecordsService } from './sleep-records.service';
import { SleepRecordsController } from './sleep-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SleepRecord, SleepRecordSchema } from './schemas/sleep-record.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SleepRecord.name, schema: SleepRecordSchema }])],
  controllers: [SleepRecordsController],
  providers: [SleepRecordsService],
})

export class SleepRecordsModule { }

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SleepRecordsModule } from './sleep-record/sleep-records.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SleepRecordsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

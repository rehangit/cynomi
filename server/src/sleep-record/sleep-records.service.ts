import { Injectable } from '@nestjs/common';
import { CreateSleepRecordDto } from './dto/create-sleep-record.dto';
import { UpdateSleepRecordDto } from './dto/update-sleep-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SleepRecord } from './schemas/sleep-record.schema';
import { Model } from 'mongoose';

@Injectable()
export class SleepRecordsService {
  constructor(@InjectModel(SleepRecord.name) private sleepRecord: Model<SleepRecord>) { }
  create(createSleepRecordDto: CreateSleepRecordDto) {
    const { name, gender, sleep } = createSleepRecordDto;
    const date = new Date(createSleepRecordDto.date);
    return this.sleepRecord.findOneAndUpdate(
      /*filter: */ { name, gender, date },
      /*update: */ { sleep },
      /*options: */ { new: true, upsert: true },
    );
  }

  findAll(name?: string, from?: string, to?: string) {
    if (name || from || to) {
      const where: any = {};
      if (name) where.name = name;

      if (from || to) {
        const toDate = new Date(to || new Date()).toISOString().slice(0, 10);
        const fromDate = new Date(from || new Date(0)).toISOString().slice(0, 10);
        where.date = { $gte: fromDate, $lte: toDate };
      }
      // console.log('findAll', { where })
      return this.sleepRecord.where(where);
    }
    return this.sleepRecord.find();
  }

  countByUsers(limit?: number, from?: string, to?: string) {
    // console.log('countByUsers', { limit, from, to });
    return this.sleepRecord.aggregate([
      {
        $match: {
          date: { $gte: new Date(from) }
        }
      },
      {
        $group: {
          _id: {
            name: "$name",
            gender: "$gender",
            date: "$date",
          },
        }
      },
      {
        $group: {
          _id: {
            name: "$_id.name",
            gender: "$_id.gender",
          },
          uniqueDates: {
            $addToSet: "$_id.date",
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.name",
          gender: "$_id.gender",
          latest: {
            $max: "$uniqueDates",
          },
          count: {
            $size: "$uniqueDates",
          },
        }
      },
      {
        $sort: {
          latest: -1,
          count: -1,
          name: 1
        },
      },
      {
        $limit: limit || 10,
      },
    ]);
  }

  findOne(id: number) {
    return this.sleepRecord.findById(id);
  }

  update(id: number, updateSleepRecordDto: UpdateSleepRecordDto) {
    const { name, gender, sleep, date } = updateSleepRecordDto;
    return this.sleepRecord.findByIdAndUpdate(id, {
      name,
      gender,
      sleep,
      ...(date ? { date: new Date(date) } : {}),
    });
  }

  remove(id: number) {
    return `This action removes a #${id} sleepRecord`;
  }
}

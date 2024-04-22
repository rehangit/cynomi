import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SleepRecordsService } from './sleep-records.service';
import { CreateSleepRecordDto } from './dto/create-sleep-record.dto';
import { UpdateSleepRecordDto } from './dto/update-sleep-record.dto';

@Controller('sleep-records')
export class SleepRecordsController {
  constructor(private readonly sleepRecordsService: SleepRecordsService) { }

  @Post()
  create(@Body() createSleepRecordDto: CreateSleepRecordDto) {
    return this.sleepRecordsService.create(createSleepRecordDto);
  }

  @Get()
  findAll(@Query('name') name?: string, @Query('from') from?: string, @Query('to') to?: string) {
    return this.sleepRecordsService.findAll(name, from, to);
  }

  @Get('user-counts')
  countByUsers(@Query('limit') limit: number, @Query('from') from?: string, @Query('to') to?: string) {
    return this.sleepRecordsService.countByUsers(+limit, from, to);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sleepRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSleepRecordDto: UpdateSleepRecordDto) {
    return this.sleepRecordsService.update(+id, updateSleepRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sleepRecordsService.remove(+id);
  }
}

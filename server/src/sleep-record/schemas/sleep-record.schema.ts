import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { Gender } from 'src/types/gender';

@Schema({ autoIndex: true, timestamps: true })
export class SleepRecord {
  @Prop({ required: true })
  name: string;

  @Prop()
  gender: Gender;

  @Prop({ required: true })
  sleep: number;

  @Prop()
  date: Date
}

export type SleepRecordDocument = HydratedDocument<SleepRecord>;
const SleepRecordSchema = SchemaFactory.createForClass(SleepRecord);

export { SleepRecordSchema };

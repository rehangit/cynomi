import { Gender } from "src/types/gender";
import { IsDate, IsDateString, IsEnum, IsPositive, IsString, Length, Matches } from 'class-validator';
import { isLength } from "validator";


export class CreateSleepRecordDto {
  @IsString()
  name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsPositive()
  sleep: number;

  @IsDateString()
  @Length(10, 10)
  date: string;
}

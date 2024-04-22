export interface SleepRecordFormInput {
  name: string;
  gender: string;
  sleep: number;
}

export interface SleepRecord extends SleepRecordFormInput {
  date: string;
}

export interface UserCounts {
  name: string;
  gender: string;
  latest: string;
  count: number;
}

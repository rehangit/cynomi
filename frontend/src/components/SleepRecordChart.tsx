import 'react';
import ReactEcharts from 'echarts-for-react';
import { SleepRecord } from '../interfaces/SleepRecord';
import { useEffect, useState } from 'react';

type SleepRecordsChartInput = {
  name: string | undefined;
  from: string;
};
const { REACT_APP_SERVER } = process.env;

export default function SleepRecordsChart({ name, from }: SleepRecordsChartInput) {
  const [userRecords, setUserRecords] = useState<SleepRecord[]>([]);

  useEffect(() => {
    if (!name?.length) return;
    fetch(`${REACT_APP_SERVER}/sleep-records?name=${name}&from=${from}`)
      .then((res) => res.json())
      .then((urecs) => {
        setUserRecords(urecs);
      });
  }, [name, from]);

  const option = {
    title: {
      text: 'Last 7 Day Sleep Records',
      textStyle: { fontFamily: 'Roboto' },
      subtext: name || 'Select a User from the table',
      subtextStyle: { fontWeight: 'bolder' },
      left: 'center',
    },
    yAxis: {},
    xAxis: {
      data: userRecords.map(({ date }) => new Date(date).toISOString().slice(0, 10)),
    },
    series: [
      {
        name: 'Sleep Duration',
        type: 'bar',
        data: userRecords.map(({ sleep }) => sleep),
        itemStyle: { color: '#9d45c8' },
      },
    ],
  };
  return (
    <ReactEcharts
      option={option}
      className="sleep-chart"
      style={{ height: '100%', width: '100%', minHeight: '20em' }}
    />
  );
}

import 'react';
import ReactEcharts, { EChartsOption } from 'echarts-for-react';
import { SleepRecord } from '../interfaces/SleepRecord';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../store/appStore';

const { REACT_APP_SERVER } = process.env;

export default function SleepRecordsChart() {
  const [state] = useContext(AppContext);
  const [userRecords, setUserRecords] = useState<SleepRecord[]>([]);

  useEffect(() => {
    if (!state.name?.length) return;
    fetch(`${REACT_APP_SERVER}/sleep-records?name=${state.name}&from=${state.since}`)
      .then((res) => res.json())
      .then((urecs) => {
        setUserRecords(urecs);
      });
  }, [state.name, state.since]);

  const option: EChartsOption = {
    title: {
      text: 'Last 7 Day Sleep Records',
      textStyle: { fontFamily: 'Roboto' },
      subtext: state.name || 'Select a User from the table',
      subtextStyle: { fontWeight: 'bolder' },
      left: 'center',
    },
    yAxis: { min: 0, max: 15 },
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

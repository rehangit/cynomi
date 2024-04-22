import { useState } from 'react';

import SleepRecordsChart from './SleepRecordChart';
import SleepRecordsList from './SleepRecordList';

export default function SleepRecordsPage() {
  const [name, setName] = useState('');

  const date = new Date();
  date.setDate(date.getDate() - 7);
  const from = date.toISOString().slice(0, 10);

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <SleepRecordsList from={from} setSelectedName={setName} />
        </div>

        <div className="column">
          <SleepRecordsChart name={name} from={from} />
        </div>
      </div>
    </div>
  );
}

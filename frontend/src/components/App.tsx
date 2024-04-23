import 'react';
import CreateSleepRecord from './CreateSleepRecordForm';
import { AppStore } from '../store/appStore';
import UserCountsList from './UserCountsList';
import SleepRecordsChart from './SleepRecordChart';

export default function App() {
  return (
    <AppStore>
      <div className="container">
        <div className="row">
          <div className="column">
            <h1 className="inline">Sleep Records</h1>
            <CreateSleepRecord />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <UserCountsList />
          </div>

          <div className="column">
            <SleepRecordsChart />
          </div>
        </div>
      </div>
    </AppStore>
  );
}

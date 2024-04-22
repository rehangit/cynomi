import { useState } from 'react';
import CreateSleepRecord from './CreateSleepRecordForm';
import SleepRecordsPage from './SleepRecordsPage';

export default function App() {
  const [showDlg, setShowDlg] = useState(0);
  console.log(process.env);
  return (
    <div className="container">
      <header>
        <h1 className="inline">Sleep Records</h1>
        <button onClick={() => setShowDlg((value) => value + 1)}>Add New Record</button>
      </header>
      <main>
        <SleepRecordsPage />
        <CreateSleepRecord show={showDlg} />
      </main>
    </div>
  );
}

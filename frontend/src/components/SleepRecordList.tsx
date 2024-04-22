import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { UserCounts } from '../interfaces/SleepRecord';
const { REACT_APP_SERVER } = process.env;

type ApiResult = UserCounts[];
type SleepRecordsListInput = {
  from: string;
  setSelectedName: (name: string) => void;
};

type DataRow = UserCounts & { index: number };

export default function SleepRecordsList({ from, setSelectedName }: SleepRecordsListInput) {
  const [records, setRecords] = useState<UserCounts[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const url = `${REACT_APP_SERVER}/sleep-records/user-counts?from=${from}&limit=100`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : []))
      .then((apiResult: ApiResult) => {
        setRecords(apiResult || []);
      });
  }, [from]);

  const columns = [
    { name: 'Name', selector: ({ name }: UserCounts) => name },
    { name: 'Gender', selector: ({ gender }: UserCounts) => gender },
    { name: 'Latest', selector: ({ latest }: UserCounts) => latest.slice(0, 10) },
    { name: 'Count', selector: ({ count }: UserCounts) => count, center: true },
  ];

  return (
    <DataTable
      style={{ fontFamily: 'monospace' }}
      dense
      columns={columns}
      data={records.map((rec, index): DataRow => ({ index, ...rec }))}
      highlightOnHover
      pointerOnHover
      pagination
      onRowClicked={({ name }) => {
        if (name) {
          setSelectedName(name);
          setSelected(name);
        }
      }}
      // conditionalRowStyles={[
      //   {
      //     when: (row) => row.index === selected?.index,
      //     style: { backgroundColor: '#9d45c8', color: 'white' },
      //   },
      // ]}
      selectableRowsSingle
      selectableRowsHighlight
      selectableRowSelected={(row) => row.name === selected}
      customStyles={{
        headCells: { style: { fontWeight: 'bold', fontSize: 'large' } },
        cells: { style: { fontSize: 'larger' } },
        table: { style: { fontFamily: 'Roboto' } },
        rows: {
          selectedHighlightStyle: {
            '&:nth-of-type(n)': { backgroundColor: '#9d45c8', color: 'white' },
          },
        },
      }}
    />
  );
}

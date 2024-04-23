import { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { UserCounts } from '../interfaces/UserCounts';
import { AppContext } from '../store/appStore';
const { REACT_APP_SERVER } = process.env;

type ApiResult = UserCounts[];
type DataRow = UserCounts & { index: number };

export default function UserCountsList() {
  const [state, dispatch] = useContext(AppContext);
  const [userCounts, setUserCounts] = useState<UserCounts[]>([]);

  useEffect(() => {
    const url = `${REACT_APP_SERVER}/sleep-records/user-counts?from=${state.since}&limit=1000`;

    fetch(url)
      .then((res) => (res.ok ? res.json() : []))
      .then((apiResult: ApiResult) => {
        setUserCounts(apiResult || []);
        if (!state.name && apiResult?.length) {
          dispatch({ type: 'name', value: apiResult?.[0]?.name });
        }
      });
  }, [state.refresh, state.since]);

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
      data={userCounts.map((rec, index): DataRow => ({ index, ...rec }))}
      highlightOnHover
      pointerOnHover
      pagination
      onRowClicked={({ name }) => {
        if (name) {
          dispatch({ type: 'selected-name', value: name });
        }
      }}
      selectableRowsSingle
      selectableRowsHighlight
      selectableRowSelected={(row) => row.name === state.name}
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

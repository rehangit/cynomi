import React, { createRef, useContext, useEffect, useState } from 'react';
import { SleepRecord } from '../interfaces/SleepRecord';
import { AppContext } from '../store/appStore';

const { REACT_APP_SERVER } = process.env;

export default function CreateSleepRecordForm() {
  const defaultFormData = {
    name: '',
    gender: '',
    sleep: 0,
    date: new Date().toISOString().slice(0, 10),
  };

  const [state, dispatch] = useContext(AppContext);
  const [recordData, setRecordData] = useState<SleepRecord>(defaultFormData);

  const dlg = createRef<HTMLDialogElement>();

  useEffect(() => {
    if (state?.show) dlg.current?.showModal();
    else dlg.current?.close();
  }, [dlg, state]);

  const handleClose = (name?: string) => {
    dispatch({ type: 'show-dialog', value: false });
    if (name) {
      dispatch({ type: 'selected-name', value: name });
      dispatch({ type: 'refresh' });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const kv = { [name]: event.target.type === 'number' ? +value : value };
    setRecordData({
      ...recordData,
      ...kv,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_SERVER}/sleep-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer abc',
        },
        body: JSON.stringify(recordData),
      });

      if (!response.ok) {
        throw new Error(`Error submitting record: ${response.status} (${response.statusText})`);
      }
      const result = await response.json();
      console.log('Record submitted successfully!', result);
      handleClose(recordData.name);
      setRecordData(defaultFormData);
    } catch (error) {
      console.error('Error while submitting record:', error);
    }
  };

  return (
    <>
      <button
        className="add-sleep-record"
        onClick={() => {
          dispatch({ type: 'show-dialog', value: true });
        }}
      >
        Add New Record
      </button>
      <dialog ref={dlg}>
        <form onSubmit={handleSubmit} method="dialog">
          <header>
            <h2>Sleep Record</h2>
            <button className="button-clear" type="reset" onClick={() => handleClose()}>
              ╳
            </button>
          </header>
          <fieldset className="details" autoFocus>
            <p>Enter sleep duration for {new Date().toLocaleDateString()}</p>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={recordData.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <input
                id="gender"
                name="gender"
                value={recordData.gender}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="sleep">Sleep Duration (hours):</label>
              <input
                type="number"
                step={0.1}
                name="sleep"
                value={recordData.sleep}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>
          <hr />
          <footer>
            <button
              type="reset"
              className="button-outline"
              onClick={() => {
                setRecordData(defaultFormData);
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={
                !recordData?.name?.length || !recordData?.gender?.length || !recordData?.sleep
              }
              className="float-right"
            >
              Submit
            </button>
          </footer>
        </form>
      </dialog>
    </>
  );
}

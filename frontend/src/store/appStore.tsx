/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { createContext, useReducer } from 'react';

export type AppState = {
  show: boolean;
  name: string;
  since: string;
  refresh: number;
};

export type AppAction = {
  type: 'show-dialog' | 'selected-name' | 'since-date' | 'refresh';
  value: boolean | string;
};

const reducer = (state: AppState, { type, value }: AppAction): AppState => {
  switch (type) {
    case 'show-dialog':
      return { ...state, show: value as boolean };
    case 'selected-name':
      return { ...state, name: value as string };
    case 'since-date':
      return { ...state, since: value as string };
    case 'refresh':
      return { ...state, refresh: state.refresh + 1 };
    default:
  }
  return state;
};

const today = new Date();
today.setDate(today.getDate() - 7);
const since = today.toISOString().slice(0, 10);

const initialState = { name: '', show: true, since, refresh: 0 };

export const AppContext = createContext<any>([initialState]);
export const AppStore = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

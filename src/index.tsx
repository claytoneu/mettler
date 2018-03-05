import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { RootState, initState } from './containers/state';
import { coordGridCellMouseOver } from './containers/app/appReducer';
import BoardViewer from './containers/app/appContainer';

import './index.css';

const NUM_COLUMNS = 9;
const NUM_ROWS = 8;
const store = createStore<RootState>(coordGridCellMouseOver, initState(NUM_COLUMNS, NUM_ROWS));

ReactDOM.render(
  <Provider store={store}>
    <BoardViewer />
  </Provider>  
  ,
  document.getElementById('root') as HTMLElement
);
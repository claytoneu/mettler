import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './components/hello'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Hello name="wut" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

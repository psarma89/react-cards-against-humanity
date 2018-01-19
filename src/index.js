import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import App from './App';
import {API_WS_ROOT} from './components/Adapter';



ReactDOM.render(
  <BrowserRouter>
    <ActionCableProvider url={API_WS_ROOT}>
      <App />
    </ActionCableProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

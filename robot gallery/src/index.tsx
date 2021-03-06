import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppStateProvider} from "./AppState"




ReactDOM.render(
  <React.StrictMode>

    {/* 3.Wrap context , inject into value*/}
    {/* in this case, will skip App but into App's child, Robot to get this contextValue of "author" */}
    <AppStateProvider>
      <App />
    </AppStateProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {persistor, store} from "./stores/redux";
import { Provider } from "react-redux";
import {  RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider >
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

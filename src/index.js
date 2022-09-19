import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

import 'antd/dist/antd.css';

export const store = configureStore();
export const getStore = () => {
  return store;
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={store.history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

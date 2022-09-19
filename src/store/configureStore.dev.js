import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../modules/rootReducer';
import rootSaga from '../modules/rootSaga';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const history = createBrowserHistory();
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );
  sagaMiddleware.run(rootSaga);
  store.history = history;
  return store;
}

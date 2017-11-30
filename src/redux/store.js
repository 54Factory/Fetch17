import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from '../redux/reducers';
//import rootSaga from '../redux/sagas';
import promise from "redux-promise";
import { reducer as formReducer } from 'redux-form';
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware, promise];

const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer,
    router: routerReducer,
  }),
  compose(applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  
),

);
// sagaMiddleware.run(rootSaga);
export { store, history };


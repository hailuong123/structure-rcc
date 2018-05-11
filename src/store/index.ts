declare var window: Window & { devToolsExtension: any, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any };
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
export type RootState = {
  routing: any;
};

const rootReducer = combineReducers<RootState>({});

// rehydrating state on app start: implement here...
const recoverState = (): RootState => ({} as RootState);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const sagaRoot = saga;

export const store = createStore(
  rootReducer,
  recoverState(),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(sagaRoot);

export type Store = { getState: () => RootState, dispatch: Function };

// systemjs-hot-reloader hook, rehydrating the state of redux store
export function __reload(exports: any) {
  console.log(exports.store.getState());
}

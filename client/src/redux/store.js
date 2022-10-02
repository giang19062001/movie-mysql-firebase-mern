import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import { all, call } from "redux-saga/effects";
import userReducer from './user/userReducer';


const rootReducer = combineReducers({
    userReducer
});

function* rootSaga() {
  yield all([call()]);
}

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
    reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger,sagaMiddleWare),

})
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);

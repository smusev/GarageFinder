import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore, createTransform} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '../reducers';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import {parse, stringify} from 'flatted';

import firebase from '../config/'

export const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState),
)

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [transformCircular]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = compose(
  applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
  );

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export {store, persistor};

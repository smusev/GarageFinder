import {combineReducers} from 'redux';
import postReducer from './postReducer';
import {loginReducer} from './authReducer';
import { firebaseReducer as firebase } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'


const rootReducer = combineReducers({
  postReducer: postReducer,
  loginReducer: loginReducer,
  firebase: persistReducer(
    { key: 'firebaseState', storage: AsyncStorage, stateReconciler: hardSet },
    firebase
  ),
  firestore: firestoreReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>

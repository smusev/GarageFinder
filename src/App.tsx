import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import Navigation from './navigation';
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import Config from 'react-native-config';
import firebase from './config/'
import { createFirestoreInstance } from 'redux-firestore';

//TODO move it  to RNconfig
const fbConfig = {
  apiKey: "AIzaSyCq9A5Jjb6hlgeTokNUQ9wtkBJtpfdR1iI",
  appId: "1:217160887815:android:b8e4c81bb4ef1bcb36c4a2",
  projectId: "garagefinder",

  authDomain: "myAuthDomain",
  databaseURL: "myDatabaseUrl",
  storageBucket: "myStorageBocket",
  messagingSenderId: "217160887815",
}

const rrfConfig = {
  userProfile: "users",
};

// Initialize firebase instance
//firebase.initializeApp(fbConfig, "garagefinder");

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};


export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Navigation />
            <StatusBar />
          </ReactReduxFirebaseProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

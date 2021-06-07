import {firebase} from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import { API_KEY } from './key'

// Initialize Firebase

const config = {
  apiKey: "AIzaSyCq9A5Jjb6hlgeTokNUQ9wtkBJtpfdR1iI",
  appId: "1:217160887815:android:b8e4c81bb4ef1bcb36c4a2",
  authDomain: "garagefinder-5ce0d.firebaseapp.com",
  databaseURL: "https://garagefinder-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "garagefinder",
  storageBucket: "goalz-7e008.appspot.com",
  messagingSenderId: "217160887815"
};

firebase.initializeApp(config, "garagefinder");
firebase.firestore();

export default firebase

import firebase from 'firebase'
import 'firebase/firestore'
import {firebaseApp} from 'firebase'
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBHTU0g_rOZr7-jhwpX8LnRupumkqY-Az0",
  authDomain: "react-native-firebase-2-7fc08.firebaseapp.com",
  projectId: "react-native-firebase-2-7fc08",
  storageBucket: "react-native-firebase-2-7fc08.appspot.com",
  messagingSenderId: "1094996791243",
  appId: "1:1094996791243:web:72e55523a1f561fc8d704e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(firebaseApp);

export default {
    firebase,
    db,
}



import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-booking-51ffe.firebaseapp.com",
  databaseURL: "https://react-booking-51ffe.firebaseio.com",
  projectId: "react-booking-51ffe",
  storageBucket: "react-booking-51ffe.appspot.com",
  messagingSenderId: "420322275863",
  appId: "1:420322275863:web:8bfc5e4a7536fbca25e252",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

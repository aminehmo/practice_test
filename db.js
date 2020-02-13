import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDdowyplhvEpYuP_A6onqUD6vIEFfXyiso",
  authDomain: "messages1-f3a36.firebaseapp.com",
  databaseURL: "https://messages1-f3a36.firebaseio.com",
  projectId: "messages1-f3a36",
  storageBucket: "messages1-f3a36.appspot.com",
  messagingSenderId: "277733791016",
  appId: "1:277733791016:web:e25da51fd74177639c6c1d",
  measurementId: "G-8CND0RRZE8"
});

export default firebase.firestore();

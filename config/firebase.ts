import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const development = {
  apiKey: "AIzaSyCeBZVDV5RRYb5LK40jbJfvXckwvjcbKjA",
  authDomain: "emil-app-c62da.firebaseapp.com",
  projectId: "emil-app-c62da",
  storageBucket: "emil-app-c62da.appspot.com",
  messagingSenderId: "890344074337",
  appId: "1:890344074337:web:cd045dbca5db21600a0e20",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(development);
}

export const FirebaseApp = firebase.app();
export const db = firebase.firestore();
export const auth = firebase.auth();

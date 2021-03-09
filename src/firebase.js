import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: false,
};


firebase.initializeApp({
  apiKey: "AIzaSyDjTeu_6-kMYPZCfT0X84WiN-F4lM5K13k",
  authDomain: "findyourmentor-99af2.firebaseapp.com",
  databaseURL: "https://findyourmentor-99af2-default-rtdb.firebaseio.com",
  projectId: "findyourmentor-99af2",
  storageBucket: "findyourmentor-99af2.appspot.com",
  messagingSenderId: "966765134793",
  appId: "1:966765134793:web:fa996ee0184bb618499e18"
})
// firebase.firestore();

export default firebase;
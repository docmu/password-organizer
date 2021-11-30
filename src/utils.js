import firebase from 'firebase';
import {getFirestore} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_2oMrQ9kA7KGkX3WbNA5V3K1p5ibKopo",
  authDomain: "password-organizer-f3e38.firebaseapp.com",
  projectId: "password-organizer-f3e38",
  storageBucket: "password-organizer-f3e38.appspot.com",
  messagingSenderId: "246723168759",
  appId: "1:246723168759:web:9fd1d2d4f96553a684c6f2",
  measurementId: "G-TMDD3X505P"
};

// firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();
// export default firebase;
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// const db=firebase.firestore();

export default db;
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC_2oMrQ9kA7KGkX3WbNA5V3K1p5ibKopo",
//   authDomain: "password-organizer-f3e38.firebaseapp.com",
//   projectId: "password-organizer-f3e38",
//   storageBucket: "password-organizer-f3e38.appspot.com",
//   messagingSenderId: "246723168759",
//   appId: "1:246723168759:web:9fd1d2d4f96553a684c6f2",
//   measurementId: "G-TMDD3X505P"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

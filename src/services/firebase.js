import firebase from "firebase/app"
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7DNLSYaCBs7OAdLATwkcNbg9vadVG30w",
    authDomain: "todolist-6ea69.firebaseapp.com",
    databaseURL: "https://todolist-6ea69.firebaseio.com",
    projectId: "todolist-6ea69",
    storageBucket: "todolist-6ea69.appspot.com",
    messagingSenderId: "175397164729",
    appId: "1:175397164729:web:c615fb7814bfc9c1cf2d68",
    measurementId: "G-L9K0WMHSPM"
  };
 firebase.initializeApp(firebaseConfig);

export const providers = {google: new firebase.auth.GoogleAuthProvider()}

export default firebase;
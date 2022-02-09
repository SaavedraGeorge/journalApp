import firebase, { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDO-zSdajc7cXx2N1Uajip-IFl65nEwoIo",
    authDomain: "journal-app-ade81.firebaseapp.com",
    projectId: "journal-app-ade81",
    storageBucket: "journal-app-ade81.appspot.com",
    messagingSenderId: "622849033409",
    appId: "1:622849033409:web:7f33aba56f6423595fc040"
  };
  
  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export{
      db,
      googleAuthProvider,
      firebase
  }
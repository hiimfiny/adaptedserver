import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAGuNJcFppMTAmrJS_GzyDKO19qcu7o778",
    authDomain: "adapted-ad2f1.firebaseapp.com",
    databaseURL: "https://adapted-ad2f1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "adapted-ad2f1",
    storageBucket: "adapted-ad2f1.appspot.com",
    messagingSenderId: "754931657429",
    appId: "1:754931657429:web:10ca4e9d37de205e13105c",
    measurementId: "G-M88064SZBS"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;

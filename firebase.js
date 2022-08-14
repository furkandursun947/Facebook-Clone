import firebase from 'firebase';
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAkXv3XnH05BVQk_32SZVlyAsMKW5pr7GU",
    authDomain: "facebook-clone-925b1.firebaseapp.com",
    projectId: "facebook-clone-925b1",
    storageBucket: "facebook-clone-925b1.appspot.com",
    messagingSenderId: "682315548613",
    appId: "1:682315548613:web:786b5209c8f7321c40adac"
  };



  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
 
const db = firebase.firestore();
const storage = firebase.storage();


export {db, storage}
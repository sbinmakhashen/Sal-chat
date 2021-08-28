import firebase from 'firebase/app';
import 'firebase/auth';
export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyCfdEo-97a_MYs_QKiZrY1rCwrx4F796Co',
    authDomain: 'demochatapp-673b1.firebaseapp.com',
    projectId: 'demochatapp-673b1',
    storageBucket: 'demochatapp-673b1.appspot.com',
    messagingSenderId: '985374789513',
    appId: '1:985374789513:web:aa6e7d480d41ed14315b58',
  })
  .auth();

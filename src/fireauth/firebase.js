import firebase from 'firebase/app';
import 'firebase/auth';
export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyAaBeLQER0jE4-lL1hfTcuvGIiSd5BKupo',
    authDomain: 'sal-chat.firebaseapp.com',
    projectId: 'sal-chat',
    storageBucket: 'sal-chat.appspot.com',
    messagingSenderId: '634191124594',
    appId: '1:634191124594:web:a1c48ba3912a0f9b71caeb',
  })
  .auth();

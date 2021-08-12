import React from 'react';
import { auth } from '../fireauth/firebase';
import firebase from 'firebase/app';

const Login = () => {
  const handleLoginGoogle = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const handleLoginFacebook = () => {
    auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  };
  return (
    <div className='login-page'>
      <div className='login-container'>
        <h1 className='login-title'>Login</h1>
        <div className='login-btns'>
          <button onClick={handleLoginGoogle} className='btn'>
            Sign in with Google
          </button>
          <button onClick={handleLoginFacebook} className='btn'>
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

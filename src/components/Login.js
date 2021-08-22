import React from 'react';
import { auth } from '../fireauth/firebase';
import firebase from 'firebase/app';
import 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
const Login = () => {
  const handleLoginGoogle = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const handleLoginFacebook = () => {
    auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  };

  const handleLoginGithub = () => {
    auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  };

  return (
    <>
      <div className='login-page'>
        <div className='login-page-header'>
          <div className='login-page-header-logo'>SalChat</div>
          <h1 className='login-page-header-headline'>
            Your Space To Be Social
          </h1>
        </div>
        <div className='login-page-container'>
          <h1 className='login-page-title'>Login</h1>
          <div className='login-page-btns'>
            <button onClick={handleLoginGoogle} className='btn'>
              <FontAwesomeIcon icon={['fab', 'google']} /> Sign in with Google
            </button>
            <i className='fab fa-facebook-square'></i>
            <button onClick={handleLoginFacebook} className='btn'>
              <FontAwesomeIcon icon={['fab', 'facebook']} /> Sign in with
              Facebook
            </button>

            <button onClick={handleLoginGithub} className='btn'>
              <FontAwesomeIcon icon={['fab', 'github']} /> Sign in with Github
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

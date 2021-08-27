import React, { useContext } from 'react';
import { auth } from '../fireauth/firebase';
import firebase from 'firebase/app';
import 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../context/AuthContext';
library.add(fab);
const Login = () => {
  const { handleLoginGithub } = useContext(AuthContext);
  const handleLoginGoogle = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const handleLoginFacebook = () => {
    auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((res) => {
        console.log(res.additionalUserInfo);
      })
      .catch((err) => {
        console.log(err);
      });
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

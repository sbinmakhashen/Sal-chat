import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../fireauth/firebase';
import firebase from 'firebase/app';
import axios from 'axios';
const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        history.push('/chat');
      }
    });
  }, [user, history]);
  var githubUsername = {};
  const handleLoginGithub = () => {
    auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => {
        githubUsername = res.additionalUserInfo.profile;
        // console.log(res.additionalUserInfo.profile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(githubUsername);
  const value = { user, handleLoginGithub, githubUsername };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

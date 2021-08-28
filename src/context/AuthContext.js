import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../fireauth/firebase';
import firebase from 'firebase/app';
const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [githubUsername, setGithubUsername] = useState();
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

  const handleLoginGithub = () => {
    auth
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then((res) => {
        setGithubUsername(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = { user, handleLoginGithub, githubUsername };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

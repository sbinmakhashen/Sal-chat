import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../fireauth/firebase';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

const Chat = () => {
  const { user, githubUsername } = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };
  useEffect(() => {
    if (!user) return history.push('/');
    // api handling
    // get the user if user has chat engine profile
    console.log(user.additionalUserInfo);
    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
          'user-name': user.email || githubUsername,
          'user-secret': user.uid,
        },
      })
      .then(() => {
        // if data is received then stop loading to show results
        setLoading(false);
      })
      .catch(() => {
        // if new user does not have a chat engine profile then create one
        let formdata = new FormData();
        formdata.append('username', user.email || githubUsername);
        formdata.append('email', user.email);
        formdata.append('secret', user.uid);
        // create user profile
        axios
          .post('https://api.chatengine.io/users/', formdata, {
            headers: {
              'private-key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
            },
          })
          .then((res) => {
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [user, history, githubUsername]);
  // if (!user || loading) return 'Loading...';
  return (
    <>
      <header>
        <div className='logo'>SalChat</div>
        <div className='logout'>
          <button onClick={handleLogout} className='btn btn-close'>
            Logout
          </button>
        </div>
      </header>
      <main className='chat-container'>
        {user && (
          <ChatEngine
            className='chat-engine'
            height='calc(96vh - 10px)'
            projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
            userName={user.email}
            userSecret={user.uid}
          />
        )}
      </main>
    </>
  );
};

export default Chat;

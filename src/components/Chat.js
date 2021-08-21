import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../fireauth/firebase';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

const Chat = () => {
  const { user } = useContext(AuthContext);
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
    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-id': '97737ec9-d161-46c0-b3d3-eb567be2a080',
          'user-name': user.email,
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
        formdata.append('username', user.email);
        formdata.append('email', user.email);
        formdata.append('secret', user.uid);
        console.log(formdata);
        // create user profile
        axios
          .post('https://api.chatengine.io/users/', formdata, {
            headers: {
              'private-key': 'f8e7e582-fcea-4c2b-a531-96a1613a8e0f',
            },
          })
          .then(() => {
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [user, history]);

  if (!user || loading) return 'Loading...';
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
      {user && (
        <main className='chat-container'>
          <ChatEngine
            height='calc(96vh - 10px)'
            projectID='97737ec9-d161-46c0-b3d3-eb567be2a080'
            userName={user.email}
            userSecret={user.uid}
          />
        </main>
      )}
    </>
  );
};

export default Chat;

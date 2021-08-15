import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../fireauth/firebase';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

const Chat = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  // api handling user
  useEffect(() => {
    if (!user) {
      history.push('/');
    } else {
      // get the user if user profile exists
      axios
        .get('https://api.chatengine.io/users/me', {
          headers: {
            'project-id': '97737ec9-d161-46c0-b3d3-eb567be2a080',
            'user-name': user.email,
            'user-secret': user.uid,
          },
        })
        .then(() => {
          setLoading(false);
        });
    }
  });

  return (
    <>
      <header>
        <div className='logo'>Salchat</div>
        <div className='logout'>
          <button onClick={handleLogout} className='btn btn-close'>
            Logout
          </button>
        </div>
      </header>
      <main className='chat-container'>
        <ChatEngine
          height='93vh'
          projectID='97737ec9-d161-46c0-b3d3-eb567be2a080'
          userName='#'
          userSecret='#'
        />
      </main>
    </>
  );
};

export default Chat;

import React, { useContext } from 'react';
import { auth } from '../fireauth/firebase';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { ChatEngine } from 'react-chat-engine';

const Chat = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

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

import React from 'react';
import { auth } from '../fireauth/firebase';
import { useHistory } from 'react-router';

const Chat = () => {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut();
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
      <main></main>
    </>
  );
};

export default Chat;

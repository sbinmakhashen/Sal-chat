import React, { useContext } from 'react';
import { auth } from '../fireauth/firebase';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
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
      <main>ChatEngine here</main>
    </>
  );
};

export default Chat;

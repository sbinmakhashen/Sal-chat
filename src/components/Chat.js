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

  const getPhotofile = async (url) => {
    const res = await fetch(url);
    const data = await res.blob();
    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  // // api handling user
  // useEffect(() => {
  //   if (!user) {
  //     history.push('/');
  //     return;
  //   }
  //   // get the user if user profile exists
  //   axios
  //     .get('https://api.chatengine.io/users/me', {
  //       headers: {
  //         'project-id': '97737ec9-d161-46c0-b3d3-eb567be2a080',
  //         'user-name': user.email,
  //         'user-secret': user.uid,
  //       },
  //     })
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       let formdata = new FormData();
  //       formdata.append('email', user.email);
  //       formdata.append('username', user.email);
  //       formdata.append('secret', user.uid);
  //       getPhotofile(user.photoURL).then((ava) => {
  //         formdata.append('avatar', ava, ava.name);
  //         // if getting the image file was a success then creat user below
  //         axios
  //           .post('https://api.chatengine.io/users/', formdata, {
  //             headers: {
  //               'private-key': 'f8e7e582-fcea-4c2b-a531-96a1613a8e0f',
  //             },
  //           })
  //           .then(() => {
  //             setLoading(false);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       });
  //     });
  // }, [user, history]);

  // // when user logs in and the data is still loading show a message
  // if (!user || loading) return 'loading...';

  // api handling
  useEffect(() => {
    if (!user) {
      history.push('/');
    }

    // get the user if user has chat engine profile
    axios
      .get('https://api.chatengine.io/me', {
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
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);
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
          userName={user.email}
          userSecret={user.uid}
        />
      </main>
    </>
  );
};

export default Chat;

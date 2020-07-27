// Update login details.
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Modal from '../components/Modal';
import './Dashboard.css';
import GenericModal from '../components/GenericModal';
import SpotifyAuth from '../components/SpotifyAuth';

const Dashboard = () => {
  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [status, setStatus] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    newPassword2: ''
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { currentPassword, newPassword, newPassword2 } = passwords;

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const deleteAccount = async () => {
    await axios.delete(`http://localhost:3000/user/${userData.user}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userData.token
      }
    });
    history.push('/login');
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('auth-token', '');
    console.log(userData);
  };

  const usernameHandler = (e) => {
    setNewUsername(e.target.value);
    // console.log(newUsername);
  };

  const passwordHandler = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    console.log(passwords);
  };

  //logic to send a newUsername
  const onSubmitUsername = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/user/${userData.user}`,
        { newUsername },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userData.token
          }
        }
      );
      console.log(response);
      console.log(response.data);
      setStatus(response.data);
    } catch (error) {
      setStatus('Error with updating username');
    }
    //refresh on submit username and have an alert?
    //needs alert to tell user that username has been updated
    // history.push('/');
  };

  const onSubmitPasswords = async (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      // setError('new passwords do not match');
      setStatus('new passwords dont match');
    } else {
      try {
        const response = await axios.put(
          `http://localhost:3000/user/${userData.user}`,
          { currentPassword, newPassword, newPassword2 },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': userData.token
            }
          }
        );
        // setStatus(response.data);
        console.log(response);
        setStatus(response.data);
      } catch (error) {
        setStatus('Error with updating password');
      }
    }
  };

  const statusHandler = () => {
    setStatus(null);
  };

  //prefill username in placeholder
  return (
    <>
      <GenericModal header='Alert!' message={status} onClear={statusHandler} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header='Are you sure?'
        footer={
          <>
            <button onClick={cancelDeleteWarningHandler}>Cancel</button>
            <button onClick={deleteAccount}>Delete Account</button>
          </>
        }
      >
        <p>Deleted accounts cannot be recovered</p>
      </Modal>
      <h2 className='header'>Dashboard</h2>
      <SpotifyAuth />
      <p>
        If you want to change the attached spotify account, or are having issues
        with your Spotify, click here.
      </p>
      <div>
        <form onSubmit={(e) => onSubmitUsername(e)} className='password-form'>
          <label>Edit Username</label>
          <input
            type='text'
            placeholder='Enter new username here'
            name='newUsername'
            required
            value={newUsername}
            onChange={(e) => usernameHandler(e)}
            className='form-input'
          />
          <input className='submit' type='submit' value='Change username' />
          {/* <button onClick={editUsername}>Edit</button> */}
        </form>

        <form onSubmit={(e) => onSubmitPasswords(e)} className='password-form'>
          <label>Current Password</label>
          <input
            type='password'
            placeholder='Current Password'
            required
            name='currentPassword'
            value={currentPassword}
            onChange={(e) => passwordHandler(e)}
            minLength='6'
            className='form-input'
          />
          <label>New Password</label>
          <input
            type='password'
            placeholder='New Password'
            required
            name='newPassword'
            value={newPassword}
            onChange={(e) => passwordHandler(e)}
            minLength='6'
            className='form-input'
          />
          <label>Confirm new password</label>
          <input
            type='password'
            placeholder='Confirm New Password'
            required
            name='newPassword2'
            value={newPassword2}
            onChange={(e) => passwordHandler(e)}
            minLength='6'
            className='form-input'
          />
          <input className='submit' type='submit' value='Change password' />
        </form>
        <button className='delete' onClick={showDeleteWarningHandler}>
          Delete Account
        </button>
      </div>
    </>
  );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from './AuthOptions';

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 className='home-header'>
        <i>Cheflist</i>
      </h1>
      <div className='navbar-links'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/add'>New</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>

        <AuthOptions />
      </div>
    </div>
  );
};

export default Navbar;

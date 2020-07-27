import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from './AuthOptions';

const Navbar = () => {
  return (
    <div className='navBar'>
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
  );
};

export default Navbar;

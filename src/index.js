import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import dotenv from 'dotenv';

// gives us access to our .env files
dotenv.config();

// render <App /> on the root div
ReactDOM.render(<App />, document.getElementById('root'));

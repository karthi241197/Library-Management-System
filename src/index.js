import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, } from 'react-router-dom';

import App from './App';
import './index.css';

const initializeLocalStorage = () => {
  const users = localStorage.getItem('users');
  const books = localStorage.getItem('books');
  const members = localStorage.getItem('members');
  const membersBooks = localStorage.getItem('membersBooks');


  if (!users) {
    localStorage.setItem('users', JSON.stringify(require('./data/users.json')));
  }
  if (!books) {
    localStorage.setItem('books', JSON.stringify(require('./data/books.json')));
  }

  if(!members){
    localStorage.setItem('members', JSON.stringify(require('./data/members.json')));
  }
  
  
  if (!membersBooks) {
    localStorage.setItem('membersBooks', JSON.stringify(require('./data/membersBooks.json')));
  }
};

initializeLocalStorage();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
 <React.StrictMode>
    
    <Router>
    <App/>
  </Router>
  </React.StrictMode>
);


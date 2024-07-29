import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import MemberPage from './components/MemberPage';
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

ReactDOM.render(
  <Router>
    <div>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/member" element={<MemberPage />} />
    </Routes>
    </div>
  </Router>,
  document.getElementById('root')
);

import React from 'react';
import './styles.css';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import MemberPage from './components/MemberPage';
import { Route,Routes } from 'react-router-dom';
const App = () => {
  return (
    <div className="App">
      
      <div>
    <Routes>
      <Route path="/Library-Management-System" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/member" element={<MemberPage />} />
    </Routes>
    </div>
    </div>
  );
};

export default App;

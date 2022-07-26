import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/loginPage/LoginPage';

function App() {
  return (
    <>
      {/* <AppBar /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/affirmation" element={<Affirmation />} />
      </Routes>
    </>
  );
}

export default App;

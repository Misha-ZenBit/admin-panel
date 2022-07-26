import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Affirmation from './pages/Affirmation/Affirmation';
import Categories from './pages/Categories/Categories';
import LoginPage from './pages/loginPage/LoginPage';

const App: React.FC = () => {
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
};

export default App;

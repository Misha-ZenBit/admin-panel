import React from 'react';
import { NavLink } from 'react-router-dom';
import { Headers, NavigationContainer } from './styles';

const AppBar: React.FC = () => {
  return (
    <>
      <Headers>
        <NavigationContainer>
          <NavLink to="/" className="navLink">
            LOGIN
          </NavLink>
          <NavLink to="/categories" className="navLink">
            CATIGORIES
          </NavLink>
          <NavLink to="/affirmation" className="navLink">
            AFFIRMATION
          </NavLink>
        </NavigationContainer>
      </Headers>
    </>
  );
};

export default AppBar;

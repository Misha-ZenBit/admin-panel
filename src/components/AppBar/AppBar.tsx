import React from "react";
import { NavLink } from "react-router-dom";
import { Header, NavigationContainer } from "./styles";

const AppBar: React.FC = () => {
    return (
      <>
         <Header>
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
    </Header>
      </>
    );
  };
  
  export default AppBar;
  
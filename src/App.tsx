import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import { useLocation } from 'react-router-dom';
import Affirmation from './pages/Affirmation/Affirmation';
import Categories from './pages/Categories/Categories';
import LoginPage from './pages/loginPage/LoginPage';
import { Button, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const isLogin = localStorage.getItem('isLogin') ? true : false;
  const navigate = useNavigate();
  const location = useLocation();

  const onLogOut = async (e: React.MouseEvent<HTMLInputElement>) => {
    localStorage.clear();
    navigate('/');
    // await window.location.reload();
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[`${location.pathname}`]}
          >
            {!isLogin ? (
              <Menu.Item key={'/'}>
                LOGIN
                <NavLink to="/" className="navLink"></NavLink>
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key={'/categories'}>
                  CATEGORIES
                  <NavLink to="/categories" className="navLink"></NavLink>
                </Menu.Item>
                <Menu.Item key={'/affirmation'}>
                  AFFIRMATION
                  <NavLink to="/affirmation" className="navLink"></NavLink>
                </Menu.Item>
              </>
            )}
          </Menu>
          {isLogin && (
            <Button
              onClick={onLogOut}
              style={{ position: 'absolute', right: 22, top: 15 }}
              type="primary"
            >
              LogOut
            </Button>
          )}
        </Header>
        <Content
          className="site-layout"
          style={{ padding: '0 50px', marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/affirmation" element={<Affirmation />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            position: 'relative',
          }}
        >
          Design ©2022 Created by ZenBit
        </Footer>
      </Layout>
    </>
  );
};

export default App;

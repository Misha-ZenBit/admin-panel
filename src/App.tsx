import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { useLocation } from 'react-router-dom';
import Affirmation from './pages/Affirmation/Affirmation';
import Categories from './pages/Categories/Categories';
import LoginPage from './pages/loginPage/LoginPage';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;


const App: React.FC = () => {
  const location = useLocation()
  
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${location.pathname}`]}>
            <Menu.Item key={'/'}>
              LOGIN
              <NavLink to="/" className="navLink"></NavLink>
            </Menu.Item>
            <Menu.Item key={'/categories'}>
              CATEGORIES
              <NavLink to="/categories" className="navLink"></NavLink>
            </Menu.Item>
            <Menu.Item key={'/affirmation'}>
              AFFIRMATION
              <NavLink to="/affirmation" className="navLink"></NavLink>
            </Menu.Item>
          </Menu>
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
        <Footer style={{ textAlign: 'center' }}>
          Design ©2022 Created by ZenBit
        </Footer>
      </Layout>
    </>
  );
};

export default App;

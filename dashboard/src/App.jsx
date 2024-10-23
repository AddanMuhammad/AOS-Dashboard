import { useState } from 'react';
import { Button, Layout, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Logo from './components/Logo';
import MenuList from './components/MenuList';
import ToggleThemeButton from './components/ToggleThemeButton';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Home from './Home';
import Create from './Create';
import Details from './Details';
import MapComponent from './components/MapComponent';

const { Header, Sider, Content } = Layout;



function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? 'dark' : 'light'}
          className='sidebar'
        >

          <Logo darkTheme={darkTheme} collapsed={collapsed} />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '16px',
              }}
            >
              <Button
                type='text'
                className='toggle'
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
              <span
                style={{
                  marginLeft: '10px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                Hello Farmer👋,
              </span>
            </div>
          </Header>
          <Content
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route path='/create' element={<Create />} />
              <Route path='/details' element={<Details />} />
              <Route path='/map' element={<MapComponent/>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

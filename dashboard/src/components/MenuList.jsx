import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, EditOutlined, PushpinOutlined } from '@ant-design/icons';

function MenuList() {
  const location = useLocation();
  const selectedKey = 
    location.pathname === '/home' ? '1' : 
    location.pathname === '/create' ? '2' : 
    location.pathname === '/details' ? '3' : 
    location.pathname === '/map' ? '4' : '1'; // Default to "1" for the first menu item

  return (
    <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined />}>
        <Link to="/create">Create</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<InfoCircleOutlined />}>
        <Link to="/details">Details</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<PushpinOutlined />}>
        <Link to="/map">Map</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuList;

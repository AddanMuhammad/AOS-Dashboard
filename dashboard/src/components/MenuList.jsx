import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, EditOutlined, PushpinOutlined } from '@ant-design/icons';

function MenuList() {
  const location = useLocation();

  // Map each route path exactly to its corresponding key
  const pathToKey = {
    '/home': '1',
    '/create': '2',
    '/details': '3',
    '/map': '4',
  };

  // Find the selected key based on the current pathname
  const selectedKey = pathToKey[location.pathname] || '1'; // Defaults to '1' for '/home'

  return (
    <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <NavLink to="/home" end>
          Home
        </NavLink>
      </Menu.Item>
      {/* <Menu.Item key="2" icon={<EditOutlined />}>
        <NavLink to="/create">
          Create
        </NavLink>
      </Menu.Item> */}
      <Menu.Item key="3" icon={<InfoCircleOutlined />}>
        <NavLink to="/details">
          Grower Info
        </NavLink>
      </Menu.Item>
      <Menu.Item key="4" icon={<PushpinOutlined />}>
        <NavLink to="/map">
          Map
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuList;

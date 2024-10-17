import { Menu } from "antd";
import { HomeOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons'

const MenuList = ({ darkTheme }) => {
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar">
            <Menu.Item key='dashboard' icon={<HomeOutlined />}>
                Dashboard
            </Menu.Item>
            <Menu.Item key='create' icon={<EditOutlined />}>
                Create
            </Menu.Item>
            <Menu.Item key='details' icon={<InfoCircleOutlined />}>
                Details
            </Menu.Item>
        </Menu>
    )
}

export default MenuList
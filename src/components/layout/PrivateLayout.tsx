// import React from 'react';

// const PrivateLayout = () => {
//   return (
//     <div>PrivateLayout</div>
//   );
// };

// export default PrivateLayout;
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CoffeeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

const { Header, Sider, Content } = Layout;

const ADMIN_ITEM = [
  {
    label: 'Dashboard',
    key: '/admin',
    href: '/admin',
    icon: <HomeOutlined />,
  },
  {
    label: 'Food',
    key: '/admin/food',
    href: '/admin/food',
    icon: <CoffeeOutlined />,
  },
  {
    label: 'Order',
    key: '/admin/order',
    href: '/admin/order',
    icon: <ShoppingCartOutlined />,
  },
];

export const PrivateLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  return (
    <Layout className='full-height-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[pathname]}
        >
          {ADMIN_ITEM?.map((item) => {
            return (
              <Menu.Item icon={item?.icon} key={item?.key} onClick={() => {
                navigate(item?.href);
              }}>
                {item?.label}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            height: 'calc(100vh - 64px)',
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};


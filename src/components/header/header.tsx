import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
   TeamOutlined,
   HomeOutlined,
   SettingTwoTone,
   CommentOutlined,
   TrademarkCircleOutlined,
   SignalFilled,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { callLogout } from '../../services/api';

const AvatarDropdown = (props: any) => {
   const dispatch = useDispatch();
   const items: MenuProps['items'] = [
      {
         key: '1',
         label: (
            <div
               onClick={async () => {
                  const res = await callLogout();
                  if (res && res.data) {
                     dispatch(doLogoutAction());
                     // navigate('/login');
                     window.location.href = '/login';
                     // navigate('/not-authorized');
                  }
               }}
            >
               Logout
            </div>
         ),
      },
   ];
   return (
      <>
         <Dropdown menu={{ items }} placement="bottom">
            {props.children}
         </Dropdown>
      </>
   );
};

const Header = () => {
   const [current, setCurrent] = useState('');
   const pathName = window.location.pathname;

   const onClick: MenuProps['onClick'] = (e) => {
      setCurrent(e.key);
   };

   const items: MenuProps['items'] = [
      {
         label: <Link to="/">Home</Link>,
         key: 'home',
         icon: <HomeOutlined />,
      },
      {
         label: <Link to="/users">Manage Users</Link>,
         key: 'users',
         icon: <TeamOutlined />,
      },
      {
         label: <Link to="/tracks">Manage Tracks</Link>,
         key: 'tracks',
         icon: <TrademarkCircleOutlined />,
      },
      {
         label: <Link to="/comments">Manage Comments</Link>,
         key: 'comments',
         icon: <CommentOutlined />,
      },
   ];

   useEffect(() => {
      if (pathName === '/') {
         setCurrent('home');
      }
      if (pathName.includes('/users')) {
         setCurrent('users');
      }
      if (pathName.includes('/tracks')) {
         setCurrent('tracks');
      }
   }, [pathName]);

   return (
      <>
         <div
            style={{
               width: '100%',
               display: 'flex',
               alignItems: 'center',
            }}
         >
            <div style={{ marginRight: '60px', paddingBottom: '2px', paddingLeft: '16px' }}>
               <AvatarDropdown>
                  <Avatar size="large" style={{ backgroundColor: 'orange' }}>
                     ADMIN
                  </Avatar>
               </AvatarDropdown>
            </div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
         </div>
      </>
   );
};

export default Header;

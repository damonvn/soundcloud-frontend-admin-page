import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import HashLoader from 'react-spinners/HashLoader';
import { createBrowserRouter, Outlet, RouterProvider, Link } from 'react-router-dom';
import HomePage from './home.page.tsx';

import UsersPage from './screens/users.page.tsx';
import './index.scss';

import Header from './components/header/header.tsx';
import LoginPage from './screens/login.page.jsx';
import { Provider, useSelector } from 'react-redux';
import store from '../src/redux/store.js';
import { callFetchAccount } from './services/api';
import { useDispatch } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import { Button, Result } from 'antd';
import LoginProtected from './components/protected.route/login.protected.jsx';
import TracksPage from './screens/tracks.page.tsx';
import CommentTable from './components/comments/comments.table.tsx';
import CommentPage from './screens/comment.page.tsx';

const NotAuthorized = () => {
   return (
      <div>
         <Result
            status="403"
            subTitle="You are not authorized, please login admin account"
            extra={
               <Button
                  onClick={() => {
                     window.location.href = '/login';
                  }}
                  type="primary"
               >
                  Login
               </Button>
            }
         />
      </div>
   );
};

const NotFound = () => {
   return (
      <div>
         <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
               <Link to="/">
                  <Button type="primary">Back Home</Button>
               </Link>
            }
         />
      </div>
   );
};

const Loading = () => {
   return (
      <div
         style={{
            height: '100vh',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <div style={{ marginTop: '-15vh' }}>
            <HashLoader color="#36d7b7" size={100} />
         </div>
      </div>
   );
};

const LayoutAdmin = () => {
   const dispatch = useDispatch();
   const [isAuthenticated, setIsAuthenticated] = useState('loading');
   const isAuthenRedux = useSelector((state) => {
      //@ts-ignore
      return state.account.isAuthenticated;
   });

   const pathName = window.location.pathname;

   //@ts-ignore
   useEffect(() => {
      if (!isAuthenRedux) {
         const fetchAccount = async () => {
            const res = await callFetchAccount();
            console.log('Check fetchAccount: ', res);
            if (res?.data) {
               const { email, name, role } = res.data.user;
               dispatch(
                  doGetAccountAction({
                     email,
                     name,
                     role,
                  }),
               );
               setIsAuthenticated('true');
            } else {
               setIsAuthenticated('false');
            }
         };

         fetchAccount();
      } else {
         setIsAuthenticated('true');
      }
   }, [isAuthenRedux]);
   return (
      <div style={{ minHeight: '100vh' }}>
         {isAuthenticated === 'loading' && <Loading />}
         {isAuthenticated === 'true' && (
            <div>
               {pathName !== '/login' && <Header />}
               <Outlet />
            </div>
         )}
         {isAuthenticated === 'false' && pathName === '/login' && (
            <div>
               <Outlet />
            </div>
         )}
      </div>
   );
};

const router = createBrowserRouter([
   {
      path: '/',
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
         { index: true, element: <HomePage /> },
         {
            path: 'users',
            element: <UsersPage />,
         },
         {
            path: 'tracks',
            element: <TracksPage />,
         },
         {
            path: 'comments',
            element: <CommentPage />,
         },
         {
            path: '/login',
            element: (
               <LoginProtected>
                  <LoginPage />
               </LoginProtected>
            ),
         },
      ],
   },
   {
      path: '/not-authorized',
      element: <NotAuthorized />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>,
);

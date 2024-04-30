import { useSelector } from 'react-redux';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

const LoginProtected = (props) => {
   const navigate = useNavigate();
   const isAuthenticated = useSelector((st) => st.account.isAuthenticated);
   const path = window.location.pathname;
   if (isAuthenticated && path === '/login') {
      window.location.href = '/';
      return;
   }
   if (!isAuthenticated && path === '/login') {
      return <>{props.children}</>;
   }
};

export default LoginProtected;

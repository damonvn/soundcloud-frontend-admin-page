import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { callFetchAccount, callLogin } from '../services/api';
import { doLoginAction } from '../redux/account/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const validateMessages = {
   required: '${label} is required!',
   types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
   },
   number: {
      range: '${label} must be between ${min} and ${max}',
   },
};

const LoginPage = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isAuthenticated = useSelector((st) => st.account.isAuthenticated);

   const onFinish = async (values) => {
      const { username, password } = values;
      // const resAuth = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, {
      //    method: 'POST',
      //    body: JSON.stringify({
      //       username: username,
      //       password: password,
      //    }),
      //    headers: {
      //       'Content-Type': 'application/json',
      //    },
      //    credentials: 'include',
      // });
      // const res = await resAuth.json();

      const res = await callLogin(username, password);
      console.log('Check login res: ', res);

      if (res?.data?.user) {
         const { email, name, role } = res.data.user;
         localStorage.setItem('access_token', res.data.access_token);
         dispatch(doLoginAction({ email, name, role }));
         window.location.href = '/';
      } else {
         notification.error('Login failed');
      }
   };

   return (
      <>
         <div className="login_page" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="login_form" style={{ marginTop: '50px', width: '400px' }}>
               <div className="heading">
                  <h2 className="text text-large">Log in</h2>
               </div>
               <Form
                  form={form}
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                     remember: false,
                  }}
                  onFinish={onFinish}
                  style={{
                     maxWidth: '400px',
                  }}
                  validateMessages={validateMessages}
               >
                  <Form.Item
                     name="username"
                     // label="Username"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your Email!',
                        },
                     ]}
                  >
                     <Input type="email" placeholder="admin@gmail.com" />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     // label="Password"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your Password!',
                        },
                     ]}
                  >
                     <Input.Password placeholder="123456" />
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </>
   );
};

export default LoginPage;

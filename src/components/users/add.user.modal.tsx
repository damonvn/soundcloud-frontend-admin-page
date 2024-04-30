import { Input, Modal, Form, Select, notification } from 'antd';
import { callCreateUser } from '../../services/api';

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

const AddUserModal = (props: any) => {
   const [form] = Form.useForm();
   const handleFormOnFinish = async (values: any) => {
      // const { name, email, password, age, gender, address, role } = values;
      // const resLogin = await callLogin('admin@gmail.com', '123456');
      // if (resLogin?.data?.user) {
      //    const access_token = resLogin.data.access_token;
      //    if (access_token) {
      //       const resCreate = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users`, {
      //          method: 'POST',
      //          headers: {
      //             'Content-Type': 'application/json',
      //             Authorization: `Bearer ${access_token}`,
      //          },
      //          body: JSON.stringify({
      //             name: name,
      //             email: email,
      //             password: password,
      //             age: age,
      //             gender: gender,
      //             address: address,
      //             role: role,
      //          }),
      //       });
      //       const res = await resCreate.json();
      //    }
      // }

      const res = await callCreateUser(values);
      if (res && res.data) {
         notification.success({
            message: 'Tạo người dùng thành công',
         });
         props.setOpenAddUserModal(false);
         form.resetFields();
         props.getUsers();
      } else {
         notification.error({
            message: 'Tạo mới người dùng không thành công',
         });
      }
   };
   return (
      <>
         <Modal
            open={props.openAddUserModal}
            onCancel={() => {
               props.setOpenAddUserModal(false);
               form.resetFields();
            }}
            title="Add user"
            maskClosable={false}
            width={450}
            okText="Create"
            closeIcon={false}
            onOk={() => form.submit()}
         >
            <div style={{ marginTop: '15px' }}>
               <Form
                  form={form}
                  validateMessages={validateMessages}
                  onFinish={(values) => handleFormOnFinish(values)}
               >
                  <Form.Item
                     name="name"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your Name!',
                        },
                     ]}
                  >
                     <Input placeholder="name" />
                  </Form.Item>
                  <Form.Item
                     name="email"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your email!',
                        },
                     ]}
                  >
                     <Input placeholder="email" />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your password!',
                        },
                     ]}
                  >
                     <Input.Password placeholder="password" type="password" />
                  </Form.Item>
                  <Form.Item
                     name="age"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your age!',
                        },
                     ]}
                  >
                     <Input placeholder="age" />
                  </Form.Item>
                  <Form.Item
                     name="gender"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your gender!',
                        },
                     ]}
                  >
                     <Select
                        showSearch
                        placeholder="gender"
                        // style={{ width: 120 }}
                        options={[
                           { value: 'male', label: 'Male' },
                           { value: 'female', label: 'Female' },
                        ]}
                     />
                  </Form.Item>
                  <Form.Item
                     name="address"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your address!',
                        },
                     ]}
                  >
                     <Input placeholder="address" />
                  </Form.Item>
                  <Form.Item
                     name="role"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your role!',
                        },
                     ]}
                  >
                     <Select
                        showSearch
                        placeholder="role"
                        // style={{ width: 120 }}
                        options={[
                           { value: 'ADMIN', label: 'Admin' },
                           { value: 'USER', label: 'User' },
                        ]}
                     />
                  </Form.Item>
               </Form>
            </div>
         </Modal>
      </>
   );
};

export default AddUserModal;

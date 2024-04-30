import { Form, Input, Modal, Select, notification } from 'antd';
import { useEffect } from 'react';
import { callUpdateUser } from '../../services/api';

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
const UpdateUserModal = (props: any) => {
   const [form] = Form.useForm();
   useEffect(() => {
      form.setFieldsValue(props.data);
   }, []);

   const onFinishForm = async (values: any) => {
      const res = await callUpdateUser(values);
      console.log('check res: ', res);
      if (res && res.data) {
         props.setOpenUpdateUserModal(false);
         props.getUsers();
         notification.success({
            message: 'Cập nhật user thành công!',
         });
      }
   };
   return (
      <Modal
         title="Update User"
         open={props.openUpdateUserModal}
         onCancel={() => props.setOpenUpdateUserModal(false)}
         onOk={() => form.submit()}
         closeIcon={false}
         maskClosable={false}
      >
         <div style={{ marginTop: '15px', marginBottom: '25px' }} className="update_user_modal">
            <Form form={form} layout="vertical" onFinish={(values) => onFinishForm(values)}>
               <Form.Item hidden labelCol={{ span: 24 }} label="ID" name="_id">
                  <Input />
               </Form.Item>
               <Form.Item
                  // labelCol={{ span: 24 }}
                  label="Name"
                  name="name"
                  rules={[
                     {
                        required: true,
                        message: 'Please input your Name!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  // labelCol={{ span: 24 }}
                  label="Email"
                  name="email"
                  rules={[
                     {
                        required: true,
                        message: 'Please input your Name!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  // labelCol={{ span: 24 }}
                  label="age"
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
                  labelCol={{ span: 24 }}
                  label="address"
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
                  // labelCol={{ span: 24 }}
                  label="gender"
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
                  // labelCol={{ span: 24 }}
                  label="role"
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
   );
};

export default UpdateUserModal;

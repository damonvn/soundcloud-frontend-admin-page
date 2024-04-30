import { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, notification } from 'antd';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { callDeleteUser, callFetchAllUsers, callFetchUsersQuery } from '../../services/api';
import AddUserModal from './add.user.modal';
import UpdateUserModal from './update.user.modal';

const UsersTable = () => {
   const [openAddUserModal, setOpenAddUserModal] = useState(false);
   const [openUpdateUserModal, setOpenUpdateUserModal] = useState<boolean>(false);
   const [usersData, setUsersData] = useState([]);
   const [updateUserData, setUpdateUserData] = useState();

   const [current, setCurrent] = useState(1);
   const [pageSize, setPageSize] = useState(2);
   const [total, setTotal] = useState(0);

   const columns: ColumnsType<any> = [
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
      },
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
         // render: (text) => <a>{text}</a>,
      },
      {
         title: 'Role',
         dataIndex: 'role',
         key: 'role',
      },
      {
         title: 'Action',
         key: 'action',
         render: (value, record) => {
            return (
               <div style={{ display: 'flex' }}>
                  <button
                     style={{ cursor: 'pointer', marginRight: '25px' }}
                     onClick={() => {
                        setUpdateUserData(record);
                        setOpenUpdateUserModal(true);
                     }}
                  >
                     Edit
                  </button>
                  <Popconfirm
                     placement="leftTop"
                     title="Delete the user"
                     description="Are you sure to delete this user?"
                     icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                     onConfirm={() => {
                        deleteUser(record._id);
                     }}
                     okText="Xác nhận"
                     cancelText="Hủy"
                  >
                     <button>Delete</button>
                  </Popconfirm>
               </div>
            );
         },
      },
   ];
   useEffect(() => {
      getUsers();
   }, [current, pageSize]);

   const getUsers = async () => {
      // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/all`, {
      //    method: 'GET',
      //    headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      //    },
      //    credentials: 'include',
      // });
      // const NO_RETRY_HEADER = 'x-no-retry';

      // const resData = await res.json();
      // console.log('>>> Check table Data: ', resData?.data?.result ? resData.data.result : res);
      // if (resData?.data?.result) {
      //    setUsersData(resData.data.result);
      // }

      const query = `current=${current}&pageSize=${pageSize}`;

      const res = await callFetchUsersQuery(query);
      if (res?.data?.result) {
         setUsersData(res.data.result);
         setTotal(res.data.meta.total);
      }
   };

   const deleteUser = async (userId: any) => {
      const res = await callDeleteUser(userId);
      //@ts-ignore
      if (res && res.data) {
         notification.success({
            message: 'Xóa user thành công!',
         });
         getUsers();
      } else {
         notification.error({
            message: 'Đã xảy ra lỗi',
         });
      }
   };

   const renderTableHeader = () => {
      return (
         <div
            style={{
               width: '100%',
               display: 'flex',
               justifyContent: 'space-between',
            }}
         >
            <div style={{ fontWeight: 700, fontSize: '18px' }}>Table User</div>
            <div>
               <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenAddUserModal(true)}
               >
                  Add user
               </Button>
            </div>
         </div>
      );
   };

   const onChange = (pagination: any) => {
      console.log('check user pagination: ', pagination);
      if (pagination && pagination.current !== current) {
         setCurrent(pagination.current);
      }

      if (pagination && pagination.pageSize !== pageSize) {
         setPageSize(pagination.pageSize);
         setCurrent(1);
      }
   };

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '15px',
            width: '100%',
         }}
      >
         <Table
            style={{ width: '100%' }}
            columns={columns}
            dataSource={usersData}
            showHeader={true}
            title={renderTableHeader}
            rowKey={(record) => record._id}
            onChange={onChange}
            pagination={{
               current: current,
               pageSize: pageSize,
               showSizeChanger: true,
               total: total,
               showTotal: (total, range) => {
                  return (
                     <div>
                        Rows {range[0]} to {range[1]} of {total}
                     </div>
                  );
               },
            }}
         />
         <>
            {openAddUserModal && (
               <AddUserModal
                  openAddUserModal={openAddUserModal}
                  setOpenAddUserModal={setOpenAddUserModal}
                  getUsers={getUsers}
               />
            )}
         </>
         <>
            {openUpdateUserModal && (
               <UpdateUserModal
                  openUpdateUserModal={openUpdateUserModal}
                  setOpenUpdateUserModal={setOpenUpdateUserModal}
                  getUsers={getUsers}
                  data={updateUserData}
               />
            )}
         </>
      </div>
   );
};

export default UsersTable;

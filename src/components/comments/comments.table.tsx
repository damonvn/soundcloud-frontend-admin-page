import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { callFetchCommentsQuery, callFetchUsersQuery } from '../../services/api';

const columns: ColumnsType<any> = [
   {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
   },
   {
      title: 'Track',
      key: 'track',
      //@ts-ignore
      render: (value, record) => {
         return record.track.title;
      },
   },
   {
      title: 'User',
      key: 'user',
      //@ts-ignore
      render: (value, record) => {
         return record.user.name;
      },
   },
   {
      title: 'Action',
      key: 'action',
      //@ts-ignore
      render: (value, record) => {
         return (
            <button onClick={() => alert(`Delete id: ${record._id}`)} style={{ cursor: 'pointer' }}>
               Delete
            </button>
         );
      },
   },
];

const CommentTable = () => {
   const [commentsData, setCommentsData] = useState([]);
   const fetComments = async () => {
      const query = `current=${1}&pageSize=${10}`;

      const res = await callFetchCommentsQuery(query);
      if (res?.data?.result) {
         setCommentsData(res.data.result);
         //  setTotal(res.data.meta.total);
      }
   };
   useEffect(() => {
      fetComments();
   }, []);
   return (
      <div style={{ marginTop: '15px' }}>
         <Table
            title={() => (
               <div style={{ textAlign: 'left', fontWeight: 600, fontSize: '18px' }}>
                  Comments Table
               </div>
            )}
            style={{ width: '100%' }}
            columns={columns}
            dataSource={commentsData}
            showHeader={true}
            rowKey={(record) => record._id}
         />
      </div>
   );
};

export default CommentTable;

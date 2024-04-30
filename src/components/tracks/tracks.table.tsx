import { useEffect, useState } from 'react';
import { Popconfirm, Table, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { callDeleteTrack, callFetchTracksQuery } from '../../services/api';

const TracksTable = () => {
   const [tracksData, setTracksData] = useState([]);
   const [tableLoading, setTableLoading] = useState(false);

   const [current, setCurrent] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const [total, setTotal] = useState(0);

   const columns: ColumnsType<any> = [
      {
         title: 'Title',
         dataIndex: 'title',
         key: 'title',
      },
      {
         title: 'Description',
         dataIndex: 'description',
         key: 'description',
         // render: (text) => <a>{text}</a>,
      },
      {
         title: 'Track url',
         dataIndex: 'trackUrl',
         key: 'trackUrl',
      },
      {
         title: 'Category',
         dataIndex: 'category',
         key: 'category',
      },
      {
         title: 'Uploader',
         key: 'uploader',
         render: (value, record) => {
            return <div>{record.uploader.name}</div>;
            return <div>chieu</div>;
         },
      },
      {
         title: 'Action',
         key: 'action',
         render: (value, record) => {
            return (
               <div style={{ display: 'flex' }}>
                  <Popconfirm
                     placement="leftTop"
                     title="Delete the track"
                     description="Are you sure to delete this track?"
                     icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                     onConfirm={() => {
                        handleDeleteTrack(record._id);
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
      getTracks();
   }, [current, pageSize]);

   const getTracks = async () => {
      setTableLoading(true);
      const query = `current=${current}&pageSize=${pageSize}`;
      const res = await callFetchTracksQuery(query);
      if (res?.data?.result) {
         setTotal(res.data.meta.total);
         setTracksData(res.data.result);
         setTableLoading(false);
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
            <div style={{ fontWeight: 700, fontSize: '18px' }}>Table Track</div>
         </div>
      );
   };

   const handleDeleteTrack = async (Id: any) => {
      const res = await callDeleteTrack(Id);
      if (res && res.data) {
         notification.success({
            message: 'Detele track success!',
         });
         getTracks();
      }
   };

   const onChange = (pagination: any) => {
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
            loading={tableLoading}
            columns={columns}
            dataSource={tracksData}
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
      </div>
   );
};

export default TracksTable;

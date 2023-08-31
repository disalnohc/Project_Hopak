import React, { useState } from 'react';
import AdminMenu from './AdminMenu';
import Table from '../component/Table';
import '../style/Table.css';

const Security = () => {
  const [searchText, setSearchText] = useState('');
  const data = [
    {
      roomNumber: '101',
      fullName: 'เจมคุง',
      details: 'ก๊อกน้ำรั่ว',
      phoneNumber: '123-456-7890',
      status: 'กำลังดำเนินการ',
    },
    {
      roomNumber: '202',
      fullName: 'สมชาย',
      details: 'หน้าต่างพัง',
      phoneNumber: '987-654-3210',
      status: 'เสร็จสิ้น',
    },
  ];

  const columns = [
    { Header: 'เลขห้อง', accessor: 'roomNumber' },
    { Header: 'ชื่อ - นามสกุล', accessor: 'fullName' },
    { Header: 'รายละเอียด', accessor: 'details' },
    { Header: 'เบอร์โทร', accessor: 'phoneNumber' },
    { Header: 'สถานะ', accessor: 'status' },
  ];

  const filteredData = data.filter((item) =>
    item.roomNumber.includes(searchText) ||
    item.fullName.includes(searchText) ||
    item.details.includes(searchText) ||
    item.phoneNumber.includes(searchText) ||
    item.status.includes(searchText)
  );

 return (
    <div className="app">
      <div className="header">
        <h2 className="subtitle">รักษาความปลอดภัย</h2>
      </div>
      <AdminMenu />
      <div className="search">
        <input
          type="text"
          placeholder="ค้นหา..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table data={filteredData} columns={columns} />
    </div>
  );  
};

export default Security;
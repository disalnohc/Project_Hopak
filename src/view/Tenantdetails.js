import React, { useState } from 'react';
import AdminMenu from './AdminMenu';
import Table from '../component/Table';
import '../style/Table.css';

const Tenantdetails = () => {
  const [searchText, setSearchText] = useState('');
  const data = [
    {
      roomNumber: '101',
      fullName: 'เจมคุง',
      niekname: 'ก๊อกน้ำรั่ว',
      email: '1adad',
      phoneNumber: '123-456-7890',
    },
    {
      roomNumber: '202',
      fullName: 'สมชาย',
      niekname: 'หน้าต่างพัง',
      email: 'sadasd',
      phoneNumber: '987-654-3210',
    },
  ];

  const columns = [
    { Header: 'เลขห้อง', accessor: 'roomNumber' },
    { Header: 'ชื่อ - นามสกุล', accessor: 'fullName' },
    { Header: 'ชื่อเล่น', accessor: 'niekname' },
    { Header: 'อีเมล', accessor: 'email' },
    { Header: 'เบอร์โทร', accessor: 'phoneNumber' },
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
        <h2 className="subtitle">รายละเอียดผู้เช่า</h2>
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

export default Tenantdetails;
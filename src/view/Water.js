import React, { useState } from 'react';
import AdminMenu from './AdminMenu';
import Table from '../component/Table';
import '../style/Note.css';

const Note = () => {
  const [searchText, setSearchText] = useState('');
  const data = [
    {
      roomNumber: '101',
      status: 'ว่าง',
      before: '100',
      current: '100',
      difference: '0',
    },
    {
      roomNumber: '202',
      status: 'ว่าง',
      before: '100',
      current: '100',
      difference: '0',
    },
  ];

  const columns = [
    { Header: 'เลขห้อง', accessor: 'roomNumber' },
    { Header: 'สถานะ', accessor: 'status' },
    { Header: 'เลขมิเตอร์ก่อนหน้า', accessor: 'before' },
    { Header: 'เลขมิเตอร์ปัจจุบัน', accessor: 'current' },
    { Header: 'ส่วนต่าง', accessor: 'difference' },
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
        <h2 className="subtitle">จดมิเตอร์</h2>
      </div>
      <AdminMenu />
      <div className="electricity-heading">
        <h2 className="electricity-title">ค่าน้ำ เดือน สิงหาคม 2566</h2>
      </div>
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

export default Note;
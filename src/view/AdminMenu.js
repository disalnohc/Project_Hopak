import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap'; 
import '../style/AdminMenu.css';

import logo from '../HoPak.png';

const AdminMenu = () => {
    return (
        <div className="admin-menu">
            <ul className="nav flex-column">
                <li className="nav-item admin-title">
                    <img src={logo} alt="Admin Logo" className="admin-logo" />
                    <span className="admin-title-text" >HoPak</span>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                        <i className="fas fa-chart-bar"></i> Dashboard
                    </a>
                </li>
                <li className="nav-item">
                    <Dropdown>
                        <Dropdown.Toggle  className="nav-link" variant="none" id="repair-dropdown-toggle" style={{ color: 'black' }}>
                            <i className="fas fa-tools"></i> บริการต่างๆ
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/Repair">
                                <i className="fas fa-wrench"></i> เเจ้งซ่อม
                            </Dropdown.Item>
                            <Dropdown.Item href="/Cleanroom">
                                <i className="fas fa-broom"></i> ทำความสะอาด
                            </Dropdown.Item>
                            <Dropdown.Item href="/Security">
                                <i className="fas fa-shield-alt"></i> รักษาความปลอดภัย
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/Roomplan">
                        <i className="fas fa-bed"></i> ผังห้องพัก
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/Tenantdetails">
                        <i className="fas fa-users"></i> รายละเอียดผู้เช่า
                    </a>
                </li>
                <li className="nav-item">
                    <Dropdown>
                        <Dropdown.Toggle  className="nav-link" variant="none" id="repair-dropdown-toggle" style={{ color: 'black' }}>
                            <i className="fas fa-tools"></i> จดมิเตอร์
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/Water">
                                <i className="fas fa-wrench"></i> ค่าน้ำ
                            </Dropdown.Item>
                            <Dropdown.Item href="/Electricity">
                                <i className="fas fa-broom"></i> ค่าไฟฟ้า
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                        <i className="fas fa-file-invoice"></i> แจ้งบิล
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                        <i className="fas fa-money-check-alt"></i> จ่ายบิล
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/News">
                        <i className="fas fa-newspaper"></i> บอร์ดข่าวสาร
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/Calender">
                        <i className="fas fa-calendar-alt"></i> ปฏิทินหอพัก
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/Personnel">
                        <i className="fas fa-users-cog"></i> บุคลากร
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;
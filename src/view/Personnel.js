import React from 'react';
import AdminMenu from './AdminMenu';
import '../style/Personnel.css';
import logo from '../HoPak.png';

const Personnel = () => {
    const cards = [
        {
            title: "Card Title 1",
            text: "Some quick example text for Card 1.",
        },
        {
            title: "Card Title 2",
            text: "Some quick example text for Card 2.",
        },
        {
            title: "Card Title 3",
            text: "Some quick example text for Card 3.",
        },
    ];

    return (
        <div className="app">
            <AdminMenu />
            <div className="header">
                <h2 className="subtitle">บุคลากร</h2>
            </div>
            <div className="card-row-container">
                {cards.map((card, index) => (
                    <div key={index} className="card">
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                        <img src={logo} alt="Employee" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Personnel;

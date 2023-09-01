import React, { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import { Button, Modal } from 'react-bootstrap';
import '../style/News.css';
//import logo from '../HoPak.png';
import NewsCard from '../component/NewsCard';
import { firestore } from '../firebase';
import { storageRef } from '../firebase';

const News = () => {
    const [show, setShow] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const [file, setFile] = useState(null);
    const firebaseStorage = storageRef.ref();

    const handleShowModal = () => {
        setShow(true);
    };

    const handleChange = (event) => {
        //console.log(event.target.files);
        setFile(URL.createObjectURL(event.target.files[0]));
    };

    const handleSaveModel = async () => {
        const NewsCardData = {
            title: document.querySelector("#NewsTitle").value,
            text: document.querySelector("#NewsText").value,
            date: document.querySelector("#NewsDate").value
        }

        try {
            const docRef = await firestore.collection('Apartment').doc('News').collection('NewsData').add(NewsCardData);
            const docId = docRef.id;
            if (file) {
                const imageRef = firebaseStorage.child(`news_image/${docId}.png`);
                const response = await fetch(file);
                const blob = await response.blob();
                await imageRef.put(blob);

            }
                console.log(`เพิ่มข้อมูล${docId}.png`)
                alert('เพิ่มสำเร็จ');
                handleCloseModal();
                fetchNewsData();
        } catch (error) {
            console.error('Error to add:', error);
        }
    };

    const handleCloseModal = () => {
        setShow(false);
        setFile(null)
    };

    const fetchNewsData = async () => {
        try {
            const collRef = firestore.collection('Apartment').doc('News').collection('NewsData');

            collRef.onSnapshot((querySnap) => {
                const newsData = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                //console.log(newsData)
                setNewsData(newsData);
            });
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    useEffect(() => {
        fetchNewsData();
    }, []);


    return (
        <div className="app">
            <AdminMenu />
            <div className="header">
                <h2 className="subtitle">บอร์ดข่าวสาร</h2>
            </div>
            <div className='button-news'>
                <button onClick={handleShowModal} className='button-news'>Add New Card</button>
            </div>
            <div className="card-row-container">
                {newsData.map((news) => (
                    <NewsCard
                        key={news.id}
                        title={news.title}
                        text={news.text}
                        date={news.date}
                        id={news.id}
                        fetchNewsData={fetchNewsData}
                    />
                ))}
            </div>
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>หัวข้อ</p>
                    <input placeholder='title' id='NewsTitle'></input>
                    <p>รายละเอียด</p>
                    <input placeholder='text' id='NewsText'></input>
                    <input type="date" id='NewsDate'></input>
                    <img src={file} width={300} height={300} alt='select file' />
                    <input type="file" onChange={handleChange} ></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveModel}>
                        Add
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default News;

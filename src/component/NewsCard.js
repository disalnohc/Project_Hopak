import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { firestore } from '../firebase';
import { storageRef } from '../firebase';

const NewsCard = ({ title, text, id, date, fetchNewsData }) => {
  const FirebaseProjectId = 'hopak-8af20';
  const docId = id;
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${FirebaseProjectId}.appspot.com/o/news_image%2F${docId}.png?alt=media`;
  const docRef = firestore.collection('Apartment').doc('News').collection('NewsData').doc(docId); // document Referent
  /*console.log(title,text,docId,date)*/

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [images , setImages] = useState(imageUrl);
  const [imageCard , setImageCard] = useState(imageUrl);

  const firebaseStorage = storageRef.ref();

  const HandleDelete = () => {
    try {
      const imageRef = storageRef.refFromURL(`gs://hopak-8af20.appspot.com/news_image/${id}.png`);
      if (imageRef.delete() && docRef.delete()) {
        console.log(`ลบข้อมูล${docId}.png`)
        alert('ลบเรียบร้อย');
        handleModalClose();
        fetchNewsData();
      }
    } catch (error) {
      console.log('Error delete Document : ', error);
    }
  };

  const HandleUpdate = async () => {
    const updateTitle = document.querySelector('#updateTitle').value;
    const updateText = document.querySelector('#updateText').value;
    const updateDate = document.querySelector('#updateDate').value;

    const UpdateData = {
      title: updateTitle,
      text: updateText,
      date: updateDate
    }
    try {
      const imageRef = firebaseStorage.child(`news_image/${docId}.png`);
      const response = await fetch(images);
      const blob = await response.blob();


      if (docRef.update(UpdateData) && imageRef.put(blob)) {
        alert('อัพเดทข้อมูลเรียบร้อย')
        handleModalClose();
        setImageCard(images);
        fetchNewsData();
      }
    } catch (error) {
      console.log('Error update data : ', error);
    }
  };

  const HandleEditOpen = () => {
    setShowModalEdit(true);
  };

  const HandleDeleteOpen = () => {
    setShowModalDelete(true);
  };

  const handleModalClose = () => {
    setShowModalEdit(false);
    setShowModalDelete(false);
  };

  const HandleChange = (event) => {
    setImages(URL.createObjectURL(event.target.files[0]))
  };

  return (
    <>
      <Card style={{ width: '18rem' }} className="card">
        <Card.Img variant="top" src={imageCard} className="card-image" />
        <Card.Body>
          <Card.Title className="card-title">{title}</Card.Title>
          <Card.Text className="card-text">{text}</Card.Text>
          <Card.Text className="card-text">{date}</Card.Text>
          <Button variant="success" className="btn-primary" onClick={HandleEditOpen}>
            Edit
          </Button>
          <Button variant="danger" className="btn-primary" onClick={(event) => HandleDeleteOpen(event, id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModalDelete} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>ลบข่าวสาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>ต้องการลบข่าวสารนี้ใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={(event) => HandleDelete(event, id)}>
            ลบ
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalEdit} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข่าวสาร</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>หัวข้อ</p>
          <input type='text' defaultValue={title} id='updateTitle'></input>
          <p>รายละเอียด</p>
          <input type='text' defaultValue={text} id='updateText'></input>
          <input type='date' defaultValue={date} id='updateDate'></input>
          <img src={images} width={300} height={300} alt='select file' />
          <input type='file' onChange={HandleChange}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={HandleUpdate}>
            Edit
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewsCard;
import React, { useState , useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { firestore } from '../firebase';
import { storageRef } from '../firebase';

const NewsCard = ({ title, text, date, id, fetchNewsData }) => {
  const docRef = firestore.collection('Apartment').doc('News').collection('NewsData').doc(id); // document Referent

  const FirebaseProjectId = 'hopak-8af20';
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${FirebaseProjectId}.appspot.com/o/news_image%2F${id}.png?alt=media`;

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [imageCard, setImageCard] = useState(null); // image in card
  const [images, setImages] = useState(imageUrl); // image edit

  const firebaseStorage = storageRef.ref();

  const HandleChange = (event) => {
    const imgInput = URL.createObjectURL(event.target.files[0]);
    //console.log(imgInput);
    setImages(imgInput)
  };

  const HandleDelete = () => {
    try {
      const imageRef = storageRef.refFromURL(`gs://hopak-8af20.appspot.com/news_image/${id}.png`);
      if (imageRef.delete() && docRef.delete()) {
        //console.log(`ลบข้อมูล${id}.png`)
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
      if (images) {
        const imageRef = firebaseStorage.child(`news_image/${id}.png`);
      const response = await fetch(images);
      const blob = await response.blob();

      if (imageRef.put(blob) && docRef.update(UpdateData)) {
        setImageCard(images);
        setImages(imageCard);
        alert('อัพเดทข้อมูลเรียบร้อย');
        handleModalClose();
        fetchNewsData();
      }
      } 
      if (!images) {
      if (docRef.update(UpdateData)) {
        alert('อัพเดทข้อมูลเรียบร้อย');
        handleModalClose();
        fetchNewsData();
      }
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
    setImages(imageUrl);
  };

  const displayImages = () => {
    try {
      firebaseStorage.child(`news_image/${id}.png`).getDownloadURL()
        .then((url) => {
          //console.log(`รูป ${id}.png อยู่ใน Storage`);
          setImageCard(url);
        })
        .catch(() => {
          console.log(`รูป ${id}.png ไม่อยู่ใน Storage`);
        });
    } catch (error) {
      console.log('error display img : ', error)
    }
  };

    useEffect(()=> {
      displayImages();
    });

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
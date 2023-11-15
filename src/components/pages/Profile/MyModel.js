import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { UpdateProfile } from '../../../actions/profileAction';

const MyModal = ({ user, show, handleClose, userId }) => {
    const dispatch = useDispatch();
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    const [bio, setBio] = useState(user.bio);
    const [selectedFile, setSelectedFile] = useState(user.profilePic);

    const fileInputRef = useRef(null);

    const uploadPhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(UpdateProfile(userId, bio, selectedFile, first_name, last_name));
        handleClose();
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Profile Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='mb-3'>
                    <label className='form-label'>Bio:</label>
                    <textarea className='form-control' value={bio} onChange={handleBioChange} />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>First Name:</label>
                    <input className='form-control' value={first_name} onChange={handleFirstName} />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Last Name:</label>
                    <input className='form-control' value={last_name} onChange={handleLastName} />
                </div>
                <div className='mb-3 fw-bold' onClick={uploadPhoto} style={{ cursor: 'pointer' }}>
                    Upload profile photo
                    <input
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        className='form-control'
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyModal;

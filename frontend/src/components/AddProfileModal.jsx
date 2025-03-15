import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddProfileModal = ({ show, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !imageFile) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const newProfile = {
      name,
      email,
      image: imagePreview,
    };

    onAdd(newProfile);

    // Reset fields
    setName("");
    setEmail("");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </Form.Group>

          {imagePreview && (
            <div className="text-center mb-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-circle"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}

          <Button variant="primary" type="submit" className="w-100">
            Add Profile
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProfileModal;

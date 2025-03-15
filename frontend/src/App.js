import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
  });

  // Fetch profiles from backend
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("http://44.214.43.75:5000/api/profiles");
      setProfiles(res.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: "", email: "", image: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("image", formData.image);

    try {
      await axios.post("http://44.214.43.75:5000/api/profiles", data);
      fetchProfiles();
      handleClose();
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#333",
      }}
    >
      <h1 className="text-center mb-5 display-4 fw-bold text-light">
        Profile App
      </h1>

      <Row className="justify-content-center g-4">
        {/* Add Profile Button */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card
            className="h-100 shadow border-0 d-flex justify-content-center align-items-center  rounded-4 hover-scale"
            style={{ cursor: "pointer", height: "300px", transition: "0.3s" }}
            onClick={handleShow}
          >
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <h1 className="display-1 fw-bold text-primary">+</h1>
              <p className="fs-5 fw-bold text-primary">Add New Profile</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Display Profiles */}
        {profiles.map((profile) => (
          <Col key={profile._id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm border-0 bg-white text-dark rounded-4 profile-card">
              <Card.Img
                variant="top"
                src={profile.imageUrl}
                style={{
                  height: "250px",
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />
              <Card.Body className="text-center">
                <h5 className="fw-bold mb-2 text-primary">{profile.name}</h5>
                <p className="mb-0 text-muted">{profile.email}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Adding Profile */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#667eea", color: "#fff" }}
        >
          <Modal.Title className="fw-bold">Add New Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f3f4f6", color: "#333" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2">
              Add Profile
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        body {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #333;
        }

        .hover-scale {
          transition: transform 0.3s ease;
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        .profile-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .profile-card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transform: translateY(-5px);
        }

        .modal-content {
          border-radius: 1rem;
        }
      `}</style>
    </Container>
  );
};

export default App;

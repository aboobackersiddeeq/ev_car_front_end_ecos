import Table from "react-bootstrap/Table";
import AdminHeader from "../../../component/header/AdminHeader";
import { Form, Button, Modal } from "react-bootstrap";
import Footer from "../../../component/footer/Footer";
import { useState } from "react";
import { Trash, PencilSquare } from "react-bootstrap-icons";
function Dealers() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [bookingPrice, setBookingPrice] = useState("");
  const [productName, setProductName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addHandler = () => {};
  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div className="adminbody contantBody ">
        <div className="container">
          <div className="row ">
            <div className="col-md-5">
              <h2 className="head-contant">Dealers</h2>
            </div>
            <div className="col-md-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-dark">Search</Button>
              </Form>
            </div>
            <div className="col-md-3">
              <Button onClick={handleShow} variant="outline-dark">
                Add Product
              </Button>
            </div>
          </div>
        </div>
        <div className="container p-5">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Photo</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Colors</th>
                <th>Actions </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>
                  {" "}
                  <PencilSquare onClick={handleShow} />
                  <Trash />{" "}
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addHandler}>
          <Modal.Body>
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt="Posts"
              width="200px"
              height="200px"
            ></img>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Upload Image</Form.Label>

              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Booking Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Product Price"
                value={bookingPrice}
                onChange={(e) => setBookingPrice(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Price"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Add Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Footer />
    </div>
  );
}

export default Dealers;

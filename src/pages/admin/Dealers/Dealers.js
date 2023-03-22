import Table from "react-bootstrap/Table";
import AdminHeader from "../../../components/header/AdminHeader";
import { Form, Button, Modal } from "react-bootstrap";
import Footer from "../../../components/footer/Footer";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  Trash,
  PencilSquare,
  PersonFillLock,
  Unlock,
} from "react-bootstrap-icons";
import axios from "../../../axios/axios";
import { dealerLogin } from "../../../redux/Dealer";
import { useDispatch } from "react-redux";
function Products() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dealers, setdealer] = useState([]);
  const [dealerName, setDealerName] = useState([]);
  const [editId, changeId] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch(dealerLogin);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShow = () => {
    setState("");
    setCity("");
    setDealerName("");
    setPhone("");
    setPassword("");
    setEmail("");
    setShow(true);
  };

  const handleShowEdit = async (index, id) => {
    await setShowEdit(true);
    changeId(id);
    setCity(dealers[index].city);
    setState(dealers[index].state);
    setPhone(dealers[index].phone);
    setDealerName(dealers[index].dealerName);
    setEmail(dealers[index].email);
    setPassword(dealers[index].password);
  };

  const addHandler = async (e) => {
    e.preventDefault();
    const errors = validate(dealerName, state, city);
    if (Object.keys(errors).length === 0) {
      setFormErrors(errors);
      setShow(false);
      axios
        .post(
          "/admin/add-dealer",
          {
            dealerName,
            city,
            state,
            phone,
            password,
            email,
          },
          {
            headers: {
              "x-access-admintoken": localStorage.getItem("admintoken"),
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(dealerLogin(response.data));
            setdealer(response.data.result);
          } else {
            swal("OOPS", response.data.message, "error");
          }

          setShow(false);
        })
        .catch((err) => {
          swal("network error: " + err.message);
        });
    } else {
      setFormErrors(errors);
    }
  };
  const editHandile = async (e) => {
    e.preventDefault();
    const errors = validate(dealerName, state, city);
    if (Object.keys(errors).length === 0) {
      axios
        .post(
          "/admin/edit-dealer",
          {
            editId,
            dealerName,
            city,
            state,
            phone,
            email,
          },
          {
            headers: {
              "x-access-admintoken": localStorage.getItem("admintoken"),
            },
          }
        )
        .then((response) => {
          setdealer(response.data.result);
          swal("Poof! Your imaginary file has been Edited!", {
            icon: "success",
          });
          setShowEdit(false);
        })
        .catch((err) => {
          swal(err.message);
        });
    } else {
      setFormErrors(errors);
    }
  };

  const deleteProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(
            "/admin/delete-dealer",
            { id },
            {
              headers: {
                "x-access-admintoken": localStorage.getItem("admintoken"),
              },
            }
          )
          .then((response) => {
            setdealer(response.data.result);
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            swal(err.message);
          });
      } else {
        swal("Your file is safe!");
      }
    });
  };

  const blockDealer = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willBlock) => {
      if (willBlock) {
        axios
          .post(
            "/admin/block-dealer",
            { id },
            {
              headers: {
                "x-access-admintoken": localStorage.getItem("admintoken"),
              },
            }
          )
          .then((response) => {
            setdealer(response.data.result);
            swal("Poof! This Dealer has been Blocked!", {
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            swal(err.message);
          });
      } else {
        swal("Your work is not saved !");
      }
    });
  };

  useEffect(() => {
    axios
      .get("/admin/get-dealers", {
        headers: {
          "x-access-admintoken": localStorage.getItem("admintoken"),
        },
      })
      .then((response) => {
        dispatch(dealerLogin(response.data));
        setdealer(response.data.result);
      });
  }, [dispatch]);
  const [searchTerm, setSearchTerm] = useState("");
  const filterData = dealers.filter((val, i, arr) => {
    if (searchTerm === "" || /^\s*$/.test(searchTerm)) {
      return true;
    } else if (
      val.dealerName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    } else if (val.state.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    } else if (val.phone.toString().includes(searchTerm)) {
      return true;
    } else if (val.city.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  });

  const validate = (dealerName, state, city) => {
    const errors = {};
    if (!dealerName) {
      errors.dealerName = "Name is required";
    } else if (/^\s*$/.test(dealerName)) {
      errors.dealerName = "Please enter a valid name";
    }
    if (!state) {
      errors.state = "State is required";
    } else if (/^\s*$/.test(state)) {
      errors.state = "Please enter a valid state";
    }
    if (!city) {
      errors.city = "City is required";
    } else if (/^\s*$/.test(city)) {
      errors.city = "Please enter a valid city";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (phone.length < 10) {
      errors.phone = "Password must be at least 10 characters long";
    } else if (isNaN(phone) || /^\s*$/.test(phone)) {
      errors.phone = " Please enter a valid phone number";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <Button variant="outline-dark">Search</Button>
              </Form>
            </div>
            <div className="col-md-3">
              <Button onClick={handleShow} variant="outline-dark">
                Add Dealer
              </Button>
            </div>
          </div>
        </div>
        <div className="container p-5">
          {filterData.length > 0 ? (
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Dealer Name</th>
                  <th>Dealer Email</th>
                  <th>Contact Number</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterData &&
                  // eslint-disable-next-line
                  filterData.map((element, index) => {
                    return (
                      <tr key={element._id}>
                        <td>{index + 1}</td>
                        <td>{element.dealerName}</td>
                        <td>{element.email}</td>
                        <td>{element.phone}</td>
                        <td>{element.state}</td>
                        <td>{element.city}</td>
                        <td>{element.createdAt}</td>
                        <td>
                          <PencilSquare
                            onClick={() => handleShowEdit(index, element._id)}
                            className="m-2"
                          />
                          {element.isBanned === false ? (
                            <Unlock
                              onClick={() => blockDealer(element._id)}
                              className="m-2"
                            />
                          ) : (
                            <PersonFillLock
                              className="m-2"
                              onClick={() => blockDealer(element._id)}
                            />
                          )}

                          <Trash onClick={() => deleteProduct(element._id)} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>

      {/* Add Product */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Dealer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Dealer name"
                value={dealerName}
                onChange={(e) => setDealerName(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="text"
                required
                minLength={10}
                maxLength={10}
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </Form.Group>
            {Object.keys(formErrors).length !== 0 && (
              <span style={{ color: "red" }}>
                {Object.values(formErrors)[0]}
              </span>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Modal */}

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Dealer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editHandile}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Dealer Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Dealer name"
                value={dealerName}
                onChange={(e) => setDealerName(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="text"
                required
                minLength={10}
                maxLength={10}
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoFocus
              />
            </Form.Group>
            {Object.keys(formErrors).length !== 0 && (
              <span style={{ color: "red" }}>
                {Object.values(formErrors)[0]}
              </span>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Footer />
    </div>
  );
}

export default Products;

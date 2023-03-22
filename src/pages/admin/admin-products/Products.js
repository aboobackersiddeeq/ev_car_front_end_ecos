import Table from 'react-bootstrap/Table';
import AdminHeader from '../../../components/header/AdminHeader';
import { Form, Button, Modal } from 'react-bootstrap';
import Footer from '../../../components/footer/Footer';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import axios from '../../../axios/axios';
import { product } from '../../../redux/product';
import { useDispatch } from 'react-redux';
import Multiselect from 'multiselect-react-dropdown';

function Products() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [products, setproduct] = useState([]);
  const [editId, changeId] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageTemb, setImageTemb] = useState('');
  const [color, setColor] = useState([]);
  const [bookingPrice, setBookingPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [options] = useState(['Blue', 'Black', 'Red', 'White']);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch(product);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => {
    setImageTemb('');
    setImage('');
    setShowEdit(false);
  };
  const handleShow = () => {
    setImage('');
    setPrice('');
    setColor('');
    setBookingPrice('');
    setProductName('');
    setShow(true);
  };

  const handleShowEdit = async (index, id) => {
    await setShowEdit(true);
    changeId(id);
    setPrice(products[index].price);
    setProductName(products[index].productName);
    setBookingPrice(products[index].bookingPrice);
    setColor(products[index].color);
    setImageTemb(products[index].image);
    console.log(color, 'handileshow edit');
  };
  const toBase64 = (image) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }).catch((err) => {
      console.log(err);
    });
  const addHandler = async (e) => {
    e.preventDefault();

    const errors = validate(productName, price, bookingPrice, color, image);
    if (Object.keys(errors).length === 0) {
      setFormErrors(errors);
      const imgBase = await toBase64(image);
      axios
        .post('/admin/add-product', {
          img: imgBase,
          price,
          color,
          bookingPrice,
          productName,
        })
        .then((response) => {
          dispatch(product(response.data));
          setproduct(response.data.result);
          setShow(false);
        });
    } else {
      setFormErrors(errors);
    }
  };
  const editHandile = async (e) => {
    e.preventDefault();
    console.log(editId);
    const imgBase = await toBase64(image);
    axios
      .post(
        '/admin/edit-product',
        {
          editId,
          img: imgBase,
          price,
          color,
          bookingPrice,
          productName,
        },
        {
          headers: {
            'x-access-admintoken': localStorage.getItem('admintoken'),
          },
        }
      )
      .then((response) => {
        setproduct(response.data.result);
        swal('Poof! Your imaginary file has been Edited!', {
          icon: 'success',
        });
        setShowEdit(false);
        setImageTemb('');
      })
      .catch((err) => {
        swal(err.message);
      });
  };

  const deleteProduct = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(
            '/admin/delete-product',
            { id },
            {
              headers: {
                'x-access-admintoken': localStorage.getItem('admintoken'),
              },
            }
          )
          .then((response) => {
            setproduct(response.data.result);
            swal('Poof! Your imaginary file has been deleted!', {
              icon: 'success',
            });
          })
          .catch((err) => {
            console.log(err);
            swal(err.message);
          });
      } else {
        swal('Your file is safe!');
      }
    });
  };

  useEffect(() => {
    axios.post('/admin/get-product', {}).then((response) => {
      dispatch(product(response.data));
      setproduct(response.data.result);
    });
  }, [dispatch]);
  const [searchTerm, setSearchTerm] = useState('');
  const filterData = products.filter((val, i, arr) => {
    const price = val.price.toString();
    if (searchTerm === '' || /^\s*$/.test(searchTerm)) {
      return true;
    } else if (
      val.productName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    } else if (
      val.color.join('').toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    } else if (price.includes(searchTerm)) {
      return true;
    } else if (val.bookingPrice.toString().includes(searchTerm)) {
      return true;
    }
    return false;
  });

  const validate = (productName, price, bookingPrice, color, image) => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const errors = {};
    if (!productName) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(productName)) {
      errors.productName = 'Please enter a valid name';
    }

    if (!price) {
      errors.price = 'Price is required';
    } else if (isNaN(price)) {
      errors.price = 'Price is not a number';
    }
    if (!bookingPrice) {
      errors.bookingPrice = 'Booking price  is required';
    } else if (isNaN(bookingPrice)) {
      errors.price = 'Price is not a number';
    }

    if (!color) {
      errors.color = 'Please choose minimum one color';
    }
    if (!image) {
      errors.bookingPrice = 'Image is required';
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
              <h2 className="head-contant">Products</h2>
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
                Add Product
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
                  <th>Photo</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Booking Price</th>
                  <th>Colors</th>
                  <th>Actions </th>
                </tr>
              </thead>
              <tbody>
                {filterData &&
                  // eslint-disable-next-line
                  filterData.map((element, index) => {
                    return (
                      <tr key={element._id}>
                        <td>{index}</td>
                        <td>
                          <img
                            src={element.image}
                            alt="Product"
                            height="50px"
                          />
                        </td>
                        <td>{element.productName}</td>
                        <td>{element.price}</td>
                        <td>{element.bookingPrice}</td>
                        <td>{element.color.join()}</td>
                        <td>
                          <PencilSquare
                            onClick={() => handleShowEdit(index, element._id)}
                            className="m-2"
                          />
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
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addHandler}>
          <Modal.Body>
            <img
              src={image ? URL.createObjectURL(image) : ''}
              alt="Posts"
              width="200px"
              height="200px"
            ></img>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Upload Image</Form.Label>

              <Form.Control
                required
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
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Color</Form.Label>
                <Multiselect
                  isObject={false}
                  onRemove={(event) => {
                    setColor(event);
                  }}
                  onSelect={(event) => {
                    setColor(event);
                  }}
                  options={options}
                  showCheckbox
                />
              </Form.Group>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                required
                min={1000}
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
                required
                type="number"
                placeholder="Booking Price"
                min={0}
                value={bookingPrice}
                onChange={(e) => setBookingPrice(e.target.value)}
                autoFocus
              />
            </Form.Group>
            {Object.keys(formErrors).length === 0 && formErrors.image}
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
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editHandile}>
          <Modal.Body>
            <img
              src={image ? URL.createObjectURL(image) ?? '' : imageTemb}
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
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Color</Form.Label>
                <Multiselect
                  isObject={false}
                  onRemove={(event) => {
                    setColor(event);
                  }}
                  OnValue={color}
                  // displayValue="color"
                  onSelect={(event) => {
                    setColor(event);
                  }}
                  options={options}
                  showCheckbox
                />
              </Form.Group>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="10000"
                autoFocus
                required
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
                min={0}
                onChange={(e) => setBookingPrice(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
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

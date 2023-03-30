import Table from 'react-bootstrap/Table';
import DealerHeader from '../../components/header/DealerHeader';
import { Form, Button } from 'react-bootstrap';
import Footer from '../../components/footer/Footer';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';

function Products() {
  const [products, setproduct] = useState([]);

  useEffect(() => {
    try {
      axios.post('/admin/get-product', {}).then((response) => {
        setproduct(response.data.result);
      });
    } catch (error) {
      swal(error.message);
    }
  }, []);
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

  return (
    <div>
      <div>
        <DealerHeader />
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
            <div className="col-md-3"></div>
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

      <Footer />
    </div>
  );
}

export default Products;

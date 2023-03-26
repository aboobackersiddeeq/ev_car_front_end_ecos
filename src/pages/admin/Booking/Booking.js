import Table from 'react-bootstrap/Table';
import AdminHeader from '../../../components/header/AdminHeader';
import { Form, Button } from 'react-bootstrap';
import Footer from '../../../components/footer/Footer';
import axios from '../../../axios/axios';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';

function Booking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get('admin/get-bookings', {
        headers: { 'x-access-admintoken': localStorage.getItem('admintoken') },
      })
      .then((response) => {
        if (response.data.status === 'success') {
          setDetails(response.data.result);
        } else {
          swal('OOPS', response.data.message, 'error');
        }
      })
      .catch((err) => {
        alert('network error: ' + err.message);
      });
  }, []);

  const filterData = details.filter((val, i, arr) => {
    if (searchTerm === '' || /^\s*$/.test(searchTerm)) {
      return true;
    } else if (val.names.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    } else if (val.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    } else if (val.city.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    } else if (val.model.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  });
  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div className="adminbody contantBody ">
        <div className="container">
          <div className="row ">
            <div className="col-md-5">
              <h2 className="head-contant">Bookings</h2>
            </div>
            <div className="col-md-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(element) => {
                    setSearchTerm(element.target.value);
                  }}
                />
                <Button variant="outline-dark">Search</Button>
              </Form>
            </div>
            <div className="col-md-3">
              <Button variant="outline-dark">Download</Button>
            </div>
          </div>
        </div>
        <div className="container p-5">
          {filterData.length > 0 ? (
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Dealer Name</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Phone No</th>
                  <th>Vehicle Name</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((element, index) => {
                  return (
                    <tr key={element._id}>
                      <td>{index + 1}</td>
                      <td>{element.updatedAt.substring(0, 10)}</td>
                      <td>{element.dealer}</td>
                      <td>{element.email}</td>
                      <td>{element.names}</td>
                      <td>{element.phone}</td>
                      <td>{element.model}</td>
                      <td>{element.state}</td>
                      <td>{element.city}</td>
                      <td>{element.status}</td>
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

export default Booking;

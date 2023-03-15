import Table from "react-bootstrap/Table";
import AdminHeader from "../../../component/Header/AdminHeader";
import { Form, Button } from "react-bootstrap";
import Footer from "../../../component/footer/Footer";
import swal from "sweetalert";
import { useState } from "react";
 
function Booking() {
    const addHandler=()=>{

    }
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
                />
                <Button variant="outline-dark">Search</Button>
              </Form>
            </div>
            <div className="col-md-3">
              <Button  variant="outline-dark">Download</Button>
            </div>
          </div>
        </div>
        <div className="container p-5">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>Vehicle Details</th>
                <th>Order Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>  dd </td>
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
      
      <Footer />
    </div>
  );
}

export default Booking;
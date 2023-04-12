import Table from 'react-bootstrap/Table';
import AdminHeader from '../../components/header/AdminHeader';
import { Form, Button } from 'react-bootstrap';
import Footer from '../../components/footer/Footer';
function Community() {
  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div className="adminbody contantBody ">
        <div className="container">
          <div className="row ">
            <div className="col-md-6">
              <h2 className="head-contant">Community</h2>
            </div>
            <div className="col-md-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </div>
          </div>
        </div>
        <div className="container p-5">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>UserId</th>
                <th>Block/Unblock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Block</td>
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
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Community;

import Table from 'react-bootstrap/Table';
import AdminHeader from '../../components/header/AdminHeader';
import { Form, Button } from 'react-bootstrap';
import Footer from '../../components/footer/Footer';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import swal from 'sweetalert';
import { PersonFillLock, Unlock } from 'react-bootstrap-icons';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/Loading';

function AdminUser() {
  const dispatch =useDispatch()
  const [users, setUsers] = useState([]);
  const blockUser = (id) => {
    swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willBlock) => {
      try {
        if (willBlock) {
          axios
            .post(
              '/admin/block-user',
              { id },
              {
                headers: {
                  'x-access-admintoken': localStorage.getItem('admintoken'),
                },
              }
            )
            .then((response) => {
              setUsers(response.data.result);
              swal('Poof! This Dealer has been Blocked!', {
                icon: 'success',
              });
            })
            .catch((err) => {
              swal(err.message);
            });
        } else {
          swal('Your work is not saved !');
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  useEffect(() => {
    dispatch(showLoading())
    axios
      .get('admin/get-users', {
        headers: { 'x-access-admintoken': localStorage.getItem('admintoken') },
      })
      .then((response) => {
        if (response.data.status === 'success') {
          setUsers(response.data.result);
          dispatch(hideLoading())
        } else {
          swal('OOPS', response.data.message, 'error');
        }
      })
      .catch((err) => {
        alert('network error: ' + err.message);
      });
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const filterData = users.filter((val, i, arr) => {
    if (searchTerm === '' || /^\s*$/.test(searchTerm)) {
      return true;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    } else if (val.phone.toString().includes(searchTerm)) {
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
            <div className="col-md-6">
              <h2 className="head-contant">User</h2>
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
          </div>
        </div>
        <div className="container p-5">
          {filterData.length > 0 ? (
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
                {filterData &&
                  // eslint-disable-next-line
                  filterData.map((element, index) => {
                    return (
                      <tr key={element.email}>
                        <td>{index + 1}</td>
                        <td>{element.username}</td>
                        <td>{element.email}</td>
                        <td>
                          {element.phone} {element.provider}
                        </td>
                        <td>{element._id}</td>
                        <td>
                          {' '}
                          {element.isBanned === false ? (
                            <Unlock
                              onClick={() => blockUser(element._id)}
                              className="m-2"
                            />
                          ) : (
                            <PersonFillLock
                              className="m-2"
                              onClick={() => blockUser(element._id)}
                            />
                          )}
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
      <Footer />
    </div>
  );
}

export default AdminUser;

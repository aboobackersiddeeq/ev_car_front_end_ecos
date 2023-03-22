import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import '../../style/header.css';
import { useSelector } from 'react-redux';
import { AppContext } from '../../context/AppContext';
function AdminHeader() {
  const { setAdminLoginStatus } = useContext(AppContext);
  const admin = useSelector((state) => state.admin.value);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('admintoken');
    setAdminLoginStatus(false);
    navigate('/admin');
  };

  return (
    <div className="header">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate('/admin');
            }}
          >
            ecos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link
                className="admin-heading"
                onClick={() => navigate('/admin/test-drive')}
                eventKey={2}
              >
                Test Drive Bookings
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={3}
                onClick={() => navigate('/admin/bookings')}
              >
                Bookings
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={4}
                onClick={() => navigate('/admin/products')}
              >
                Products
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={5}
                onClick={() => navigate('/admin/community')}
              >
                Community
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={6}
                onClick={() => navigate('/admin/dealers')}
              >
                Dealers
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={7}
                onClick={() => navigate('/admin/users')}
              >
                Users
              </Nav.Link>
              {admin && (
                <Nav.Link
                  className="admin-heading"
                  eventKey={7}
                  onClick={logout}
                >
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminHeader;

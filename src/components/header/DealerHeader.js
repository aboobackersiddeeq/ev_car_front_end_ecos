import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import '../../style/header.css';
import { useSelector } from 'react-redux';
import { AppContext } from '../../context/AppContext';
function AdminHeader() {
  const navigate = useNavigate();
  const { setDealerLoginStatus } = useContext(AppContext);
  const dealer = useSelector((state) => state.dealer.value);
  const logout = () => {
    localStorage.removeItem('dealertoken');
    setDealerLoginStatus(false);
    navigate('/dealer');
  };
  return (
    <div className="header">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#">ecos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link
                className="admin-heading"
                onClick={() => navigate('/dealer/test-drive')}
                eventKey={2}
              >
                Test Drive Bookings
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={3}
                onClick={() => navigate('/dealer/bookings')}
              >
                Bookings
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={4}
                onClick={() => navigate('/dealer/products')}
              >
                Products
              </Nav.Link>

              <Nav.Link
                className="admin-heading"
                eventKey={6}
                onClick={() => navigate('/dealer/dealers')}
              >
                Users
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={7}
                onClick={() => navigate('/dealer/users')}
              >
                Profile
              </Nav.Link>
              {dealer && (
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

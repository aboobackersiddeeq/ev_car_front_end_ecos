import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import '../../style/header.css';
import { useSelector } from 'react-redux';
import { AppContext } from '../../context/AppContext';
import Profile from '../../pages/dealer/Profile';
import { useState } from 'react';
function AdminHeader() {
  const navigate = useNavigate();
  const { setDealerLoginStatus } = useContext(AppContext);
  const dealer = useSelector((state) => state.dealer.value);
  const [profileShow, setProfileShow] = useState(false);
  const logout = () => {
    localStorage.removeItem('dealertoken');
    setDealerLoginStatus(false);
    navigate('/dealer');
  };
  return (
    <div className="header">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate('/dealer')}>ecos</Navbar.Brand>
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
                eventKey={7}
                onClick={() => setProfileShow(true)}
                onDoubleClick={() => setProfileShow(false)}
              >
                Profile
              </Nav.Link>
              {dealer && (
                <Nav.Link
                  className="admin-heading"
                  eventKey={8}
                  onClick={logout}
                >
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="dealer_profile">
        {profileShow && <Profile setProfileShow={setProfileShow} />}
      </div>
    </div>
  );
}

export default AdminHeader;

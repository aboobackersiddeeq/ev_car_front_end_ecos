import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signOut } from 'firebase/auth';
import { AuthContext, firebaseContext } from '../../context/FirebaseContext';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import '../../style/headerTwo.css';
import { useContext } from 'react';
function HeaderTwo() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { auth } = useContext(firebaseContext);
  return (
    <div className="parentNav">
      <div className="navup">
        <span>Chat With Us </span>
        <span>Charging Locator </span>
        <span>Community </span>
        {user ? (
          <span
            onClick={() => {
              signOut(auth);
              navigate('/login');
            }}
          >
            Logout
          </span>
        ) : (
          <span onClick={() => navigate('/login')}>Login</span>
        )}
        <span id="endSpan">
          Call<span id="middleSpan">1800 209 8282</span>For Any Assistance
        </span>
      </div>
      {['md '].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 navbar">
          <Container>
            <Navbar.Brand href="#">Ecos</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Ecos
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="offcanvasBody">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    className="nexon-ev"
                    onClick={() => navigate('/ev-prime')}
                  >
                    Nexon EV PRIME
                  </Nav.Link>
                  <Nav.Link
                    className="nexon-ev"
                    onClick={() => navigate('/ev-max')}
                  >
                    Nexon EV MAX
                  </Nav.Link>
                  <Nav.Link
                    className="nexon-ev ml-2"
                    onClick={() => navigate('/ev-dark')}
                  >
                    Dark Edition
                  </Nav.Link>
                  <Nav.Link className="hidden" href="#action1">
                    Home
                  </Nav.Link>
                  <Nav.Link
                    className="book-now"
                    eventKey={5}
                    onClick={() => navigate('/ev-test-booking')}
                  >
                    Book A Test Drive
                  </Nav.Link>
                  <Nav.Link className="book-now" eventKey={3} href="#me">
                    Download Brochure
                  </Nav.Link>
                  <Nav.Link
                    className="book-now"
                    eventKey={4}
                    onClick={() => navigate('/booking')}
                  >
                    Book Now
                  </Nav.Link>
                  <Nav.Link className="hidden" href="#action2">
                    Chat With Us
                  </Nav.Link>
                  <Nav.Link className="hidden" href="#action2">
                    Charging Locator{' '}
                  </Nav.Link>
                  <Nav.Link className="hidden" href="#action2">
                    Community
                  </Nav.Link>
                  <Nav.Link className="hidden" href="#action2">
                    Profile
                  </Nav.Link>
                  <Nav.Link className="hidden" href="#action2">
                    Logout
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default HeaderTwo;

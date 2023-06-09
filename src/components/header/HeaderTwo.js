import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import '../../style/headerTwo.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useDispatch } from 'react-redux';
import { userData } from '../../redux/User';
import { selectionGroup } from '../../redux/Community';
function HeaderTwo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLoginStatus, setUserLoginStatus } = useContext(AppContext);
  return (
    <div className="parentNav">
      <div className="navup">
        <span className="sub-heading" onClick={() => navigate('/chat')}>
          Chat With Us{' '}
        </span>
        <span className="sub-heading" onClick={() => navigate('/map')}>
          Charging Locator
        </span>
        <span className="sub-heading" onClick={() => navigate('/community')}>
          Community{' '}
        </span>
        {userLoginStatus ? (
          <span
            className="sub-heading"
            onClick={() => {
              localStorage.removeItem('usertoken');
              setUserLoginStatus(false);
              dispatch(userData(null));
              dispatch(selectionGroup(null));
              navigate('/login');
            }}
          >
            Logout
          </span>
        ) : (
          <span className="sub-heading" onClick={() => navigate('/login')}>
            Login
          </span>
        )}
        <span id="endSpan" className="sub-heading">
          Call<span id="middleSpan">1800 209 8282</span>For Any Assistance
        </span>
      </div>
      {['md '].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 navbar">
          <Container>
            <Navbar.Brand onClick={() => navigate('/')}>
            <img onClick={() => navigate('/')} className='ecos-name' src="/ecos-name.png" alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  onClick={() => navigate('/')}
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                >
                  
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
                  {/* <Nav.Link className="hidden" href="#action1">
                    Home
                  </Nav.Link> */}
                  <Nav.Link
                    className="book-now"
                    eventKey={5}
                    onClick={() => navigate('/ev-test-booking')}
                  >
                    Book A Test Drive
                  </Nav.Link>
                  <Nav.Link className="book-now " eventKey={3} href="#me">
                    Download Brochure
                  </Nav.Link>
                  <Nav.Link
                    className="book-now "
                    eventKey={4}
                    onClick={() => navigate('/booking')}
                  >
                    Book Now
                  </Nav.Link>
                  <Nav.Link
                    className="hidden"
                    onClick={() => navigate('/chat')}
                  >
                    Chat With Us
                  </Nav.Link>
                  <Nav.Link className="hidden" onClick={() => navigate('/map')}>
                    Charging Locator{' '}
                  </Nav.Link>
                  <Nav.Link
                    className="hidden"
                    onClick={() => navigate('/community')}
                  >
                    Community
                  </Nav.Link>
                  {/* <Nav.Link className="hidden" href="#action2">
                    Profile
                  </Nav.Link> */}
                  <Nav.Link className="hidden">
                    {userLoginStatus ? (
                      <span
                        onClick={() => {
                          localStorage.removeItem('usertoken');
                          setUserLoginStatus(false);
                          dispatch(userData(null));
                          dispatch(selectionGroup(null));
                          navigate('/login');
                        }}
                      >
                        Logout
                      </span>
                    ) : (
                      <span onClick={() => navigate('/login')}>Login</span>
                    )}
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

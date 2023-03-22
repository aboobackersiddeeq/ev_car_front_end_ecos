import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "../header/header.css";
function BookingFooter() {
  const navigate = useNavigate();
  return (
    <div className="booking-footer">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/admin");
            }}
          >
            ecos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
               <div className="regFormBtn  ">
                <button  className="nexon-btn h-checkout p-3 ">CHECKOUT</button>
              </div>
            </Nav>
          </Navbar.Collapse>
              
        </Container>
      </Navbar>
    </div>
  );
}

export default BookingFooter;

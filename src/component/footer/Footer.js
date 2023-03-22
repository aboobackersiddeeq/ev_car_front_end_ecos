import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "../header/header.css";
function Footer() {
  const navigate = useNavigate();
  return (
    <div>
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
              <Nav.Link
                className="admin-heading"
                onClick={() => navigate("")}
                eventKey={9}
              >
                FAQS
              </Nav.Link>{" "}
              <Nav.Link
                className="admin-heading"
                eventKey={3}
                onClick={() => navigate(" ")}
              >
                PRIVACY POLICY
              </Nav.Link>
              <Nav.Link
                className="admin-heading"
                eventKey={4}
                onClick={() => navigate(" ")}
              >
                TERMS AND CONDITION
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;

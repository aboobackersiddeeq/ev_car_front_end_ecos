import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AuthContext, firebaseContext } from "../../context/firebaseContext";
import { useContext } from "react";
import "../Header/header.css";
function Footer() {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(firebaseContext);
  const navigate = useNavigate();
  return (
    <div >
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          {/* <img
          width="20px"
          height="20px"
          className="logo"
          src="../../../Images/ecosLogo2.png"
        ></img> */}
          <Navbar.Brand
            onClick={() => {
              navigate("/admin");
            }}
          >
            ecos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
             
            </Nav>
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

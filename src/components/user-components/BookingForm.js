import React, { useEffect, useState } from "react";
import "../../style/booking.css";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, ListGroup } from "react-bootstrap";

const BookingForm = (props) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const [selectedModal, setModal] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [color, setColor] = useState([]);
  const [price, setPrice] = useState("");

  const [isActive, setIsActive] = useState(0);

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      setFormErrors(errors);
      axios.post("/test-drive", {}).then(() => {
        navigate("/ev-thank");
      });
    } else {
      setFormErrors(errors);
    }
  };
  useEffect(() => {
    axios.post("/admin/get-product", {}).then((response) => {
      const pro = response.data.result;
      setProduct(response.data.result);
      setActiveIndex(0);
      setPrice(pro[0].price);
      setModal(pro[0].productName);
      setColor(pro[0].color);
      setSelectedColor(color[0]);
      props.onData(pro[0].image);
    });
  }, []);

  const handleElement = (index) => {
    setActiveIndex(index);
    setPrice(product[index].price);
    setModal(product[index].productName);
    props.onData(product[index].image);
    setColor(product[index].color);
  };

  const handilecolor = (index) => {
    console.log(index);
    setIsActive(index);
    console.log(color[index], "color");
    setSelectedColor(color[index]);
    console.log(selectedColor, index);
  };

  const validate = (data) => {
    const errors = {};
    if (!data.color) {
      errors.color = "Please choose your color";
    }
    if (!data.model) {
      errors.model = "Please choose your modal";
    }
    return errors;
  };

  return (
    <div className="BgForm1">
      <div className="LgForm">
        <form onSubmit={handleSubmit}>
          <h1 className="please">SELECT YOUR VARIANT</h1>
          <div className="form-horizontal registerForm" id="register">
            <div className="input-field selectField">
              <div className="select_boxe col-lg-6">
                <ListGroup className="ListGroupPara">
                  {product &&
                    product.map((element, index) => {
                      return (
                        <div key={index}>
                          <ListGroup.Item
                            onClick={() => {
                              handleElement(index);
                            }}
                            className={
                              index === activeIndex
                                ? "active  ListGroup"
                                : " ListGroup"
                            }
                          >
                            {element.productName}
                          </ListGroup.Item>
                        </div>
                      );
                    })}
                </ListGroup>
              </div>
            </div>

            <h1 className="please">SELECT YOUR COLOR:</h1>
            <div className="col-md-12"></div>

            <div className="peracard">
              {color &&
                color.map((element, index) => {
                  return (
                    <Card
                      key={element}
                      className="card"
                      style={{ width: "7rem" }}
                    >
                      <Card.Body>
                        <Button
                          onClick={() => {
                            handilecolor(index);
                          }}
                          className={
                            index === isActive
                              ? "active Button tick-active"
                              : "Button"
                          }
                          style={{ backgroundColor: element }}
                        ></Button>
                        <p className="center">{element}</p>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
            <div>
              <div className="bookingPara">
                <div className="booking-amount">
                  <h3>$ 21,000</h3>
                  <p>Booking Amount</p>
                </div>
                <div className="booking-amount">
                  <h3>$ {price}</h3>
                  <p>Ex-Showroom price</p>
                </div>
              </div>
              <div className="regFormBtn  ">
                <button className="nexon-btn h-checkout   ">CHECKOUT</button>
              </div>
            </div>

            <div className="registerBtn capthcbtnsub">
              <div className="regFormBtn captchaForm nwcaptichWrap">
                <div className="g-recaptcha " id="g-recaptcha"></div>
                <div className="col-xs-6 col-sm-6 np captchaInput "></div>
              </div>
            </div>
          </div>
        </form>
        <div className="messageError">
          <span className="message" style={{ display: "none" }}></span>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

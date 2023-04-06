import React, { useContext, useEffect, useState } from 'react';
import '../../style/booking.css';
import axios from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';
import Loader from '../Loader';
const BookingForm = (props) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedModel, setModal] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [colors, setColor] = useState([]);
  const [price, setPrice] = useState('');
  const [bookingPrice, setBookingPrice] = useState('');
  const [isActive, setIsActive] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const { setBookingData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      const data = {};
      data.price = price;
      data.color = selectedColor;
      data.model = selectedModel;
      data.bookingPrice = bookingPrice;
      setFormErrors(errors);
      setBookingData(data);
      navigate('/checkout');
    } else {
      setFormErrors(errors);
    }
  };
  useEffect(() => {
    try {
      axios
        .post('/admin/get-product', {})
        .then((response) => {
          const pro = response.data.result;
          setProduct(response.data.result);
          setActiveIndex(0);
          setPrice(pro[0].price);
          setBookingPrice(pro[0].bookingPrice);
          setModal(pro[0].productName);
          setColor(pro[0].color);
          setSelectedColor(pro[0].color[0]);
          props.onData(pro[0].image);

          setIsLoading(false);
        })
        .catch((error) => {
          toast.error('Network error' + error.message);
        });
    } catch (err) {
      toast.error('Network error');
    }
    // eslint-disable-next-line
  }, []);
  function handleElement(index) {
    setActiveIndex(index);
    setPrice(product[index].price);
    setBookingPrice(product[index].bookingPrice);
    setModal(product[index].productName);
    props.onData(product[index].image);
    setColor(product[index].color);
  }

  const handilecolor = (index) => {
    setIsActive(index);
    setSelectedColor(colors[index]);
  };

  const validate = () => {
    const errors = {};
    if (!colors) {
      errors.color = 'Please choose your color';
    }
    if (!selectedModel) {
      errors.model = 'Please choose your modal';
    }
    return errors;
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
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
                                    ? 'active  ListGroup'
                                    : ' ListGroup'
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

                <h1 className="please pb-2">SELECT YOUR COLOR:</h1>
                <div className="col-md-12"></div>

                <div className="peracard">
                  {colors &&
                    colors.map((element, index) => {
                      return (
                        <div
                          key={element}
                          className=""
                          style={{ width: '7rem' }}
                        >
                          <Card.Body>
                            <Button
                              onClick={() => {
                                handilecolor(index);
                              }}
                              className={
                                index === isActive
                                  ? 'active Button tick-active'
                                  : 'Button '
                              }
                              style={{ backgroundColor: element }}
                            ></Button>
                            <p className="center">{element}</p>
                          </Card.Body>
                        </div>
                      );
                    })}
                </div>
                <div className="peracard">
                  <div className="bookingPara">
                    <div className="booking-amount">
                      <h3>$ {bookingPrice}</h3>
                      <p>Booking Amount</p>
                    </div>
                    <div className="booking-amount">
                      <h3>$ {price}</h3>
                      <p>Ex-Showroom price</p>
                    </div>
                    <button className="nexon-btn h-checkout  btn-block">
                      CHECKOUT
                    </button>
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
              {Object.keys(formErrors).length !== 0 && (
                <span>{Object.values(formErrors)[0]}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;

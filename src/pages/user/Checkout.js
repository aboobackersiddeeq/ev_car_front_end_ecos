import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/footer/home-footer/Footer';
import HeaderTwo from '../../components/header/HeaderTwo';
import { AppContext } from '../../context/AppContext';
import axios from '../../axios/axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [dealerData, setDealerData] = useState([]);
  const handlePayment = async (params) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: formData.bookingPrice * 100,
      currency: 'INR',
      name: 'ecos',
      description: 'Test Transaction',
      image: ' ',
      handler: function (response) {
        if (response.razorpay_payment_id) {
          toast.success('Payment success', response.razorpay_payment_id);
          axios
            .post('/update-booking', { params })
            .then(() => {
              navigate('/ev-thank');
            })
            .catch((error) => {
              swal(error.message);
            });
        } else {
          toast.error('Payment failed:', response.error.description);
        }
      },
      prefill: {
        name: 'Aboobacker siddeeq p',
        email: 'a.siddeeqpktr@gmail.com',
        contact: '9746975809',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      toast(response);
    });
  };

  useEffect(() => {
    try {
      axios
        .get('get-dealer', {})
        .then((response) => {
          setDealerData(response.data.result);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { bookingData } = useContext(AppContext);
  useEffect(() => {
    formData.color = bookingData.color;
    formData.model = bookingData.model;
    formData.bookingPrice = bookingData.bookingPrice;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      setFormErrors(errors);
      axios
        .post('/booking', { formData })
        .then(async (response) => {
          if (response.data.status === 'failed') {
            toast.error(response.data.message);
          } else if (response.data.status === 'success') {
            handlePayment(response.data.orderId);
          } else if (response.data.status === 'Pending') {
            handlePayment(response.data.orderId);
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      setFormErrors(errors);
    }
  };

  const validate = (data) => {
    const phoneRegex = /^\d{10}$/;
    const errors = {};
    if (!data.names) {
      errors.name = 'Name is required';
    } else if (/^\s*$/.test(data.names)) {
      errors.name = 'Please enter a valid name';
    }
    if (!data.lastName) {
      errors.lastName = 'Lastname is required';
    } else if (/^\s*$/.test(data.names)) {
      errors.lastName = 'Please enter a valid name';
    }
    if (!data.address1) {
      errors.address1 = 'Address is required';
    } else if (/^\s*$/.test(data.address1)) {
      errors.address1 = 'Please enter a valid address';
    }
    if (!data.address2) {
      errors.address2 = 'Address  is required';
    } else if (/^\s*$/.test(data.address2)) {
      errors.address2 = 'Please enter a valid address';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.phone) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(data.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!data.pincode) {
      errors.pincode = 'Pincode number is required';
    } else if (!/^\d{6}$/.test(data.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit pincode.';
    }
    if (!data.city) {
      errors.city = 'Please choose your city';
    }
    if (!data.state) {
      errors.state = 'Please choose your state';
    }

    if (!data.dealer) {
      errors.dealer = 'Please choose your modal';
    }

    return errors;
  };
  return (
    <div className="  bg-light">
      <HeaderTwo />
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"></div>
      <div className="container conteiner1">
        <div className="py-5 text-center">
          <h2>Checkout </h2>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4 rounded-0">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">AMOUNT PAYABLE </span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Booking Amount</h6>
                  <small className="text-muted">{bookingData.model}</small>
                </div>
                <span className="text-muted">${bookingData.bookingPrice}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">3.3 kW AC Charger Box</h6>
                  <small className="text-muted">Smart Connectivity</small>
                </div>
                <span className="text-muted">Included</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0"> {bookingData.color}</h6>
                  <small className="text-muted">Selected Color</small>
                </div>
                <span className="text-muted"></span>
              </li>
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <small className="text-muted">
                    This is the booking amount. Rest of the amount will be
                    payable at the dealership selected.
                  </small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total </span>

                <strong>${bookingData.bookingPrice}</strong>
              </li>
            </ul>

            {/* <div className="card p-2 ">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-md-8 order-md-1 ">
            <h4 className="text-center ">YOUR PERSONAL DETAILS</h4>
            <form className="  " onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label forhtml="firstName">Mobile Number*</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Mobile Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label forhtml="firstName">First Name*</label>
                  <input
                    name="names"
                    type="text"
                    className="form-control rounded-0"
                    placeholder="First Name*"
                    value={formData.names}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label forhtml="lastName">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control rounded-0"
                    id="lastName"
                    placeholder="Last Name*"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label forhtml="email">
                  Email Address* <span className="text-muted"> </span>
                </label>
                <input
                  type="text"
                  className="form-control  rounded-0"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
              <h4 className=" text-center">BILLING ADDRESS</h4>
              <div className="mb-3">
                <label forhtml="address">Address 1 *</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Address 1 *"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="mb-3">
                <label forhtml="address2">Address 2 *</label>
                <input
                  type="text"
                  name="address2"
                  className="form-control rounded-0"
                  value={formData.address2}
                  onChange={handleInputChange}
                  placeholder="Address 2 *"
                />
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label forhtml="country">State</label>
                  <select
                    className="custom-select d-block w-100 p-2"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select State</option>
                    <option value={1}>United States</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label forhtml="city">City</label>
                  <select
                    className="custom-select d-block w-100 p-2"
                    id="state"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  >
                    <option value=""> Select City</option>
                    <option value={5}>California</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label forhtml="zip">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    className="form-control rounded-0"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    required
                  />
                </div>
              </div>

              <h4 className=" text-center">DEALER INFORMATION</h4>
              <div className="col-md-12 mb-3">
                <label forhtml="firstName"></label>
                <select
                  className="custom-select d-block w-100 p-2"
                  name="dealer"
                  value={formData.dealer}
                  onChange={handleInputChange}
                  required
                >
                  {' '}
                  <option value=""> Select Dealer</option>
                  {dealerData &&
                    dealerData.map((value, index) => {
                      return (
                        <option value={value._id}>
                          {value.dealerName},{value.state},{value.city}
                        </option>
                      );
                    })}
                </select>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div className="d-block my-3">
                <div className="custom-control custom-radio"></div>
              </div>
              <div className="row"></div>
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <label className="custom-control-label" forhtml="same-address">
                  Call <strong>1800 209 8282</strong> for any assistance.
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <label className="custom-control-label" forhtml="save-info">
                  Give us a missed call on <strong>7574890000</strong>
                </label>
              </div>
              <br />
              {Object.keys(formErrors).length !== 0 && (
                <span style={{ color: 'red' }}>
                  {Object.values(formErrors)[0]}
                </span>
              )}
              <br />
              <button className="btn btn-primary btn-lg btn-block rounded-0 nexon-btn h-checkout">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;

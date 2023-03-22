import React from "react";
import HeaderTwo from "../../components/header/HeaderTwo";

const Checkout = () => {
  return (
    <div className="maincontainer bg-light">
      <HeaderTwo />
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"></div>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout </h2>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4 rounded-0">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">AMOUNT PAYABLE NOW</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Booking Amount</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$12</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">3.3 kW AC Charger Boxt</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">Included</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0"> Intensi-Teal</h6>
                  <small className="text-muted">Selected Color</small>
                </div>
                <span className="text-muted"></span>
              </li>
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  {/* <h6 className="my-0">Promo code</h6> */}
                  <small className="text-muted">
                    This is the booking amount. Rest of the amount will
                    <br />
                    be payable at the dealership selected.
                  </small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total </span>

                <strong>$20</strong>
              </li>
            </ul>

            <form className="card p-2">
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
            </form>
          </div>
          <div className="col-md-8 order-md-1 ">
            <h4 className="text-center ">YOUR PERSONAL DETAILS</h4>
            <form   className="needs-validation " novalidate>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label forHtml="firstName">Mobile Number*</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="firstName"
                    placeholder="Mobile Number"
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label forHtml="firstName">First Name*</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="firstName"
                    placeholder="First Name*"
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label forHtml="lastName">Last Name*</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="lastName"
                    placeholder="Last Name*"
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label forHtml="email">
                  Email Address* <span className="text-muted"> </span>
                </label>
                <input
                    type="text"
                    className="form-control  rounded-0"
                    id="email"
                    placeholder="Last Name*"
                    value=""
                    required
                  />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
              <h4 className=" text-center">BILLING ADDRESS</h4>
              <div className="mb-3">
                <label forHtml="address">Address 1 *</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="Address 1 *"
                  placeholder="Address 1 *"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="mb-3">
                <label forHtml="address2">Address 2 *</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="Address 2 *"
                  placeholder="Address 2 *"
                />
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label forHtml="country">State</label>
                  <select
                    className="custom-select d-block w-100 p-2"
                    id="country"
                    required
                  >
                    <option value="">Select State</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label forHtml="state">City</label>
                  <select
                    className="custom-select d-block w-100 p-2"
                    id="state"
                    required
                  >
                    <option value=""> Select City</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label forHtml="zip">Pincode</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="Pincode"
                    placeholder="Pincode"
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <h4 className=" text-center">DEALER INFORMATION</h4>

              <div className="d-block my-3">
                <div className="custom-control custom-radio"></div>
              </div>
              <div className="row"></div>
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <label className="custom-control-label" forHtml="same-address">
                  Call <strong>1800 209 8282</strong> for any assistance.
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <label className="custom-control-label" forHtml="save-info">
                  Give us a missed call on <strong>7574890000</strong>
                </label>
              </div>
              <br/>
              <button
                className="btn btn-primary btn-lg btn-block rounded-0 nexon-btn h-checkout"
                type="button"
              >
                Continue to checkout
              </button>
            </form>
          </div>
        </div>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">&copy; 2020-2021 therichpost.com</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Support</a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Checkout;

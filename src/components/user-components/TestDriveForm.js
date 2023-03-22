import React, { useState } from 'react';
import '../../style/test-drive-form.css';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from '../../axios/axios';
import { useNavigate } from 'react-router-dom';

const TestDriveForm = () => {
  // eslint-disable-next-line
  const [captcha, setCaptchaValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    model: '',
    dealership: '',
    checked: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validate(formData);
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      setFormErrors(errors);
      axios.post('/test-drive', { formData }).then(() => {
        navigate('/ev-thank');
      });
    } else {
      setFormErrors(errors);
    }
  };
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const validate = (data) => {
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const errors = {};
    if (!data.name) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(data.name)) {
      errors.name = 'Please enter a valid name';
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
    if (!data.city) {
      errors.city = 'Please choose your city';
    }
    if (!data.state) {
      errors.state = 'Please choose your state';
    }
    // if (!captcha) {
    //   errors.captcha = "Please fill captcha";
    // } else {
    //   errors.captcha = "";
    // }
    if (!data.model) {
      errors.model = 'Please choose your modal';
    }
    if (!isChecked) {
      errors.checked = 'Please accept Terms and conditions';
    }
    return errors;
  };

  return (
    <div className="BgForm">
      <div className="LgForm">
        <h1 className="please">Please Fill in your details</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-horizontal registerForm" id="register">
            <div className=" ">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="has-content form-input"
              />
              <label htmlFor="name">Your Full Name*</label>
              {formErrors.name && (
                <span className="msg">{formErrors.name}</span>
              )}
            </div>

            <div className="input-field">
              <input
                type="text"
                id="phone"
                name="phone"
                // required
                value={formData.phone}
                onChange={handleInputChange}
                minLength={10}
                maxLength={10}
                className="has-content"
              />
              <label htmlFor="phone">Your Phone Number*</label>
              {formErrors.phone && (
                <span className="msg">{formErrors.phone}</span>
              )}
            </div>

            <div className="input-field  ">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                // required
                className="effect has-content"
              />
              <label htmlFor="email">Your Email Id*</label>
              {formErrors.email && (
                <span className="msg">{formErrors.email}</span>
              )}
            </div>

            <div className="input-field selectField">
              <div className="select_box">
                <select
                  className="form-control selectRegister has-content "
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select Your State*</option>

                  <option value="19">Kerala</option>
                  <option value="35">Tamil Nadu</option>
                  <option value="36">Telangana</option>
                </select>
                {formErrors.state && (
                  <span className="emsg">{formErrors.state}</span>
                )}
              </div>
              <span
                className="msg"
                id="state_msg"
                style={{ display: 'none' }}
              ></span>
            </div>

            <div className="input-field selectField">
              <div className="select_box">
                <select
                  // required
                  className="form-control selectRegister  has-content"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  {' '}
                  <option value="">Select Your City*</option>
                  <option value="Bijoynagar">Bijoynagar</option>
                  <option value="Biswanath Chariali">Biswanath Chariali</option>
                  <option value="Bokakhat">Bokakhat</option>
                  <option value="Bongaigaon">Bongaigaon</option>
                </select>
                {formErrors.city && (
                  <span className="emsg">{formErrors.city}</span>
                )}
              </div>
            </div>

            <div className="input-field selectField selectEv">
              <div className="select_box">
                <select
                  className="form-control selectRegister  has-content form-select"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  // required/
                >
                  {' '}
                  <option value="">Select an EV*</option>
                  <option value="NexonEVPRIME">Nexon EV PRIME</option>
                  <option value="NexonEVMax">Nexon EV MAX</option>
                  <option value="NexonEVDark">Nexon EV (#Dark)</option>
                </select>
                {formErrors.model && (
                  <span className="emsg">{formErrors.model}</span>
                )}
              </div>
            </div>

            <input type="hidden" name="utmsource" value="Website" />
            <div className="registercheckbox">
              <label className="customCheckbox container">
                By clicking on submit, I agree to the{' '}
                <a href="/">Terms &amp; Conditions</a> and{' '}
                <a href="/">Privacy Policy</a> by Tata Motors and also consent
                to receive updates including but not limited to products and
                services from Tata Motors or any of its associates/affiliates
                via phone call, email, SMS, and/or WhatsApp or any other medium.
                <input
                  name="remember"
                  id="remember"
                  type="checkbox"
                  checked={isChecked}
                  onChange={(event) => setIsChecked(event.target.checked)}
                />
                <span class="checkmark"></span>
              </label>
              {formErrors.checked && (
                <span className="msg">{formErrors.checked}</span>
              )}
            </div>
            <div className="registerBtn capthcbtnsub">
              <div className="regFormBtn captchaForm nwcaptichWrap">
                <div className="g-recaptcha " id="g-recaptcha"></div>
                <div className="col-xs-6 col-sm-6 np captchaInput "></div>

                <ReCAPTCHA
                  sitekey="6LfpixAlAAAAAOvccWtvHMkI4las1J1l8eoaKI4i"
                  onChange={handleCaptchaChange}
                />
              </div>
              {formErrors.captcha && (
                <span className="msg">{formErrors.captcha}</span>
              )}
              <div className="regFormBtn  ">
                <button className="nexon-btn ">SUBMIT</button>
              </div>
            </div>
          </div>
        </form>
        <div className="messageError">
          <span className="message" style={{ display: 'none' }}></span>
        </div>
      </div>
    </div>
  );
};

export default TestDriveForm;

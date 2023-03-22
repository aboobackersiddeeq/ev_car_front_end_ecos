import React from "react";

const TestDriveForm = () => {
  return (
    <div>
      <div class="LgForm">
        <h1>Please Fill in your details</h1>

        <div className="form-horizontal registerForm" id="register">
          <input type="hidden" name="c5c902d99a" value=" " />
          <input
            type="hidden"
            name="csrftoken"
            value="b80b28273d7d44e4be21d63c138d8ec023c8d913346a313e79226e84c96aee6e2d835efe2483fa018ff43c86bbb44553f04e55be87fa2ef10029efac35329b42"
          />

          <div className="input-field">
            <input
              type="text"
              id="name"
              name="name"
              data-validation="custom"
              autocomplete="off"
              data-validation-regexp="^([a-zA-Z ]+)$"
              data-validation-error-msg="Please enter a valid Name"
              onkeypress="return onlyAlphabets(event,this);"
              required=""
              className="has-content"
            />
            <label for="name">Your Full Name*</label>
            <span className="msg" id="name_msg" style="display: none;"></span>
          </div>

          <div className="input-field">
            <input
              type="text"
              id="phone"
              name="phone"
              data-validation="number length"
              data-validation-length="10-10"
              data-validation-regexp="^((.)\1+)$"
              autocomplete="off"
              data-validation-error-msg="Please enter a valid Phone Number. Phone Number must be of length 10."
              maxlength="10"
              onkeypress="return onlyNumbers(event,this);"
              required=""
              className="has-content"
            />
            <label for="phone">Your Phone Number*</label>
            <span className="msg" id="phone_msg" style="display: none;"></span>
          </div>

          <div className="input-field">
            <input
              type="email"
              id="email"
              name="email"
              data-validation="email"
              data-validation-error-msg="Please enter a valid e-mail"
              required=""
              className="effect"
            />
            <label for="email">Your Email Id*</label>
            <span className="msg" id="email_msg">
              Please enter a valid Email
            </span>
          </div>

          <div className="input-field selectField">
            <div className="select_box">
              <select
                className="form-control selectRegister"
                id="state"
                name="state"
                data-validation="required"
                data-validation-error-msg="Please choose your city"
              >
                <option value="">Select Your State*</option>

                <option value="1">Andaman and Nicobar Islands</option>
                <option value="2">Andhra Pradesh</option>
                <option value="3">Arunachal Pradesh</option>
                <option value="4">Assam</option>
                <option value="5">Bihar</option>
                <option value="6">Chandigarh</option>
                <option value="7">Chhattisgarh</option>
                <option value="8">Dadra and Nagar Haveli</option>
                <option value="9">Daman and Diu</option>
                <option value="10">Delhi</option>
                <option value="11">Goa</option>
                <option value="12">Gujarat</option>
                <option value="13">Haryana</option>
                <option value="14">Himachal Pradesh</option>
                <option value="15">Jammu and Kashmir</option>
                <option value="16">Jharkhand</option>
                <option value="17">Karnataka</option>
                <option value="19">Kerala</option>
                <option value="20">Lakshadweep</option>
                <option value="21">Madhya Pradesh</option>
                <option value="22">Maharashtra</option>
                <option value="23">Manipur</option>
                <option value="24">Meghalaya</option>
                <option value="25">Mizoram</option>
                <option value="26">Nagaland</option>
                <option value="29">Odisha</option>
                <option value="31">Pondicherry</option>
                <option value="32">Punjab</option>
                <option value="33">Rajasthan</option>
                <option value="34">Sikkim</option>
                <option value="35">Tamil Nadu</option>
                <option value="36">Telangana</option>
                <option value="37">Tripura</option>
                <option value="38">Uttar Pradesh</option>
                <option value="39">Uttarakhand</option>
                <option value="41">West Bengal</option>
              </select>
            </div>
            <span className="msg" id="state_msg" style="display: none;"></span>
          </div>

          <div className="input-field selectField">
            <div className="select_box">
              <select
                className="form-control selectRegister"
                id="city"
                name="city"
                data-validation="required"
                data-validation-error-msg="Please choose your city"
              >
                {" "}
                <option value="">Select Your City*</option>
                <option value="Bijoynagar">Bijoynagar</option>
                <option value="Biswanath Chariali">Biswanath Chariali</option>
                <option value="Bokakhat">Bokakhat</option>
                <option value="Bongaigaon">Bongaigaon</option>
                <option value="Dhubri">Dhubri</option>
                <option value="Dibrugarh">Dibrugarh</option>
                <option value="Digboi">Digboi</option>
                <option value="Duliajan">Duliajan</option>
                <option value="Goalpara">Goalpara</option>
                <option value="Golaghat">Golaghat</option>
                <option value="Guwahati">Guwahati</option>
                <option value="Hajo">Hajo</option>
                <option value="Hojai">Hojai</option>
                <option value="Jorhat">Jorhat</option>
                <option value="Kokrajhar">Kokrajhar</option>
                <option value="Mangaldoi">Mangaldoi</option>
                <option value="Moran">Moran</option>
                <option value="Morigaon">Morigaon</option>
                <option value="Nagaon">Nagaon</option>
                <option value="Sadiya">Sadiya</option>
                <option value="Sibsagar">Sibsagar</option>
                <option value="Tezpur">Tezpur</option>
                <option value="Tinsukia">Tinsukia</option>
                <option value="Udalguri">Udalguri</option>
              </select>
            </div>
            <span className="msg" id="city_msg">
              Please choose your city
            </span>
          </div>

          <div className="input-field selectField selectEv">
            <div className="select_box">
              <select
                className="form-control selectRegister"
                id="model"
                name="model"
              >
                <option value="">Select an EV*</option>
                <option value="NexonEVPRIMEJETEdition">
                  Nexon EV PRIME JET Edition
                </option>
                <option value="NexonEVMAXJETEdition">
                  Nexon EV MAX JET Edition
                </option>
                <option value="NexonEVPRIME">Nexon EV PRIME</option>
                <option value="NexonEVMax">Nexon EV MAX</option>
                <option value="NexonEVDark">Nexon EV (#Dark)</option>
              </select>
            </div>
          </div>

          <div
            className="input-field selectField selectyesno"
            style="display: none;"
          >
            <p>Want to book a test drive in 15 days?*</p>
            <div className="col-xs-6 col-sm-6 col-md-4">
              <label className="customradio">
                Yes
                <input type="radio" name="radio" value="Yes" />
                <span className="radiocheckmark"></span>
              </label>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-8">
              <label className="customradio">
                No
                <input type="radio" name="radio" value="No" />
                <span className="radiocheckmark"></span>
              </label>
            </div>
            <span className="msg" id="drive_msg"></span>
          </div>

          <div
            className="input-field selectField selectField1 "
            style="display: none;"
          >
            <div className="select_box">
              <select
                className="form-control selectRegister"
                id="dealership"
                name="dealership"
                data-validation="required"
                data-validation-error-msg="Select Dealership"
              >
                <option value="">Select Dealership*?</option>
              </select>
            </div>
            <span className="msg" id="dealer_msg"></span>
          </div>

          <input type="hidden" name="utmsource" value="Website" />
          <div className="registercheckbox">
            <label className="customCheckbox">
              By clicking on submit, I agree to the{" "}
              <a
                href="https://nexonev.tatamotors.com/terms-and-conditions/"
                target="_blank"
              >
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a
                href="https://nexonev.tatamotors.com/privacy-policy"
                target="_blank"
              >
                Privacy Policy
              </a>{" "}
              by Tata Motors and also consent to receive updates including but
              not limited to products and services from Tata Motors or any of
              its associates/affiliates via phone call, email, SMS, and/or
              WhatsApp or any other medium.
              <input
                type="checkbox"
                name="remember"
                id="remember"
                data-validation="required"
                data-validation-error-msg="Please accept Terms and conditions"
              />
              <span className="checkmark"></span>
            </label>
            <span className="msg" id="tnc_msg" style="display: none;"></span>
          </div>

          <div className="registerBtn capthcbtnsub">
            <div className="regFormBtn captchaForm nwcaptichWrap">
              <div className="g-recaptcha " id="g-recaptcha"></div>
              <div className="col-xs-6 col-sm-6 np captchaInput">
                <label className="form-label" for="captcha">
                  Enter Captcha Code
                </label>
                <input
                  id="captcha"
                  name="captcha"
                  className="form-input"
                  type="text"
                  data-validation="required"
                  maxlength="10"
                />
              </div>
              <div className="col-xs-6 col-sm-6 np">
                <div className="captcha d-flex">
                  <img
                    src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/nwcaptcha.php"
                    className="imgcaptcha"
                    alt="Captcha Code"
                    title="Captcha Code"
                  />
                  <img
                    src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/images/refresh.png"
                    alt="reload"
                    className="refresh"
                  />
                </div>
              </div>
            </div>

            <div className="regFormBtn discover-tech-btn reg_submit">
              <button
                type="button"
                className="nexon-btn nexon-btn1"
                onclick="_paq.push(['FormAnalytics::trackFormSubmit', document.getElementById('register')])"
              >
                <span>SUBMIT</span>
                <i className="b-tip"></i>
              </button>
              <a href="#" className="nexon-btn">
                SUBMIT
              </a>
            </div>
          </div>
        </div>
        <div className="messageError">
          <span className="message" style=""></span>
        </div>
      </div>
    </div>
  );
};

export default TestDriveForm;

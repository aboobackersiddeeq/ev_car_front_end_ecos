import React from 'react';
import '../../../style/home-footer.css';
import SendIcon from '@mui/icons-material/Send';
const Footer = () => {
  return (
    <div>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="cta-text">
                    <h4>Find us</h4>
                    <span>1010 Avenue, sw 54321, India</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone"></i>
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>18002098282</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open"></i>
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>ecostarplus@outlook.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <p>
                      <img
                        src="images/ecosLogo2.png"
                        className="img-fluid"
                        alt="logo"
                      />
                    </p>
                  </div>
                  <div className="footer-text">
                    <p>
                      Ecos is a website for booking or test drive booking
                      electrical cars ,and supporting electric drivers for
                      finding charging locations and sharing their feeling and
                      tips through the Ecos community app .
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    {/* <span>Follow us</span>
                                 <i className="fab fa-facebook-f facebook-bg"></i> 
                                <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                                <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a> */}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3> Links</h3>
                  </div>
                  <ul>
                    <li>Home</li>
                    <li>about</li>
                    <li>services</li>
                    <li>portfolio</li>
                    <li>Contact</li>
                    <li>About us</li>
                    <li>Our Services</li>
                    <li>Expert Team</li>
                    <li>Contact us</li>
                    <li>Latest News</li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                      <SendIcon/>
                        {/* <i className="fab fa-telegram-plane"></i> */}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>Copyright &copy; 2023, All Right Reserved </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu">
                  <ul>
                    <li>Home</li>
                    <li>Terms</li>
                    <li>Privacy</li>
                    <li>Policy</li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

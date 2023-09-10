import React from 'react';
import '../../style/brochure.css'
const Brochure = () => {
  return (
    <div>
      <div className=" popup_content1 pop_con popupBrochure">
        <div className="popupclosebtn">
          <img
            className="img-responsive"
            src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/closebtnIcon.png"
            alt='close'
          />
        </div>
        <div className="tc_content">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="col-xs-6 col-sm-4 col-md-4 wrapBrochure">
              <a
                href="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/images/Nexon-EV-MAX-Brochure.pdf"
                download=""
                title="Nexon EV MAX Brochure"
                style={{ position: 'relative' }}
              >
                {' '}
                <img
                  className="img-responsive thumbBrochure"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/nexon-max-pdf-thumb.jpg"
                  alt='nexon-max'
                />
                <img
                  className="img-responsive downloadICON"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/ico-download.png"
                  alt='nexon-max'
                />
              </a>
              <p className="titleBrochure">Nexon EV MAX Brochure</p>
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4 wrapBrochure">
              <a
                href="https://youtu.be/gKpdGLcMcVw"
                title="Nexon EV MAX Video Brochure"
                style={{ position: 'relative' }}
              >
                <img
                  className="img-responsive thumbBrochure"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/brochuremax-thumb.jpg"
                  alt='nexon-max'
                />
              </a>
              <p className="titleBrochure">Nexon EV MAX Video Brochure</p>
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4 wrapBrochure">
              <a
                href="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/images/brochure/Nexon-EV-PRIME-Brochure.pdf"
                download=""
                title="Nexon EV Brochure"
                style={{ position: 'relative' }}
              >
                <img
                  className="img-responsive thumbBrochure"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/Nexon-EV-pdf-thumb.jpg"
                  alt='nexon-max'
                />

                <img
                  className="img-responsive downloadICON"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/ico-download.png"
                  alt='nexon-max'
                />
              </a>
              <p className="titleBrochure">
                Nexon EV PRIME <br className="mobbr" />
                Brochure
              </p>
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4 wrapBrochure">
              <a
                href="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/images/brochure/Nexon-EV-Max-Dark-Brochure-Digital.pdf"
                download=""
                title="Nexon EV Max Dark Brochure"
                style={{ position: 'relative' }}
              >
                <img
                  className="img-responsive thumbBrochure"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/Nexon-EV-Max-Dark-pdf-thumb.jpg"
                  alt='nexon-max'
                />

                <img
                  className="img-responsive downloadICON"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/ico-download.png"
                  alt='nexon-max'
                />
              </a>
              <p className="titleBrochure">Nexon EV Max #Dark Brochure</p>
            </div>

            <div className="col-xs-6 col-sm-4 col-md-4 wrapBrochure">
              <a
                href="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/images/brochure/Nexon-EV-Prime-Dark-Brochure-Digital.pdf"
                download=""
                title="Nexon EV Prime Dark Brochure"
                style={{ position: 'relative' }}
              >
                <img
                  className="img-responsive thumbBrochure"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/Nexon-EV-Dark-pdf-thumb.jpg"
                  alt='nexon-max'
                />

                <img
                  className="img-responsive downloadICON"
                  src="https://nexonev.tatamotors.com/wp-content/themes/tata-nexon/assets/ico-download.png"
                  alt='nexon-max'
                />
              </a>
              <p className="titleBrochure">Nexon EV PRIME #Dark Brochure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brochure;

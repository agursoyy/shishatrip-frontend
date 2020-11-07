import React from 'react';
import { Col, Image, Nav, Row } from 'react-bootstrap';
import './sectionHeaderWithPinkLogo.scss';

const SectionHeaderWithPinkLogo = (props: any) => {
  console.log(props);
  return (
    <React.Fragment>
      {props.local && (
        <div>
          <Row className="local-row-cafe">
            <Col lg={4} className="local-col-cafe">
              <div className="local-section1-top-left-buttons-wrapper-cafe">
                <div className="local-section1-top-left-button-template">
                  <div className="">
                    <Image
                      className="local-section1-button-eye-cafe"
                      src="/images/eye 1.svg"
                      alt="React Logo"
                    />
                    <span className="local-section1-top-left-button-template-number">
                      {' '}
                      {props.local.stats.view ? props.local.stats.view : 0}
                    </span>
                  </div>
                  <div className="">
                    <p className="local-section1-top-left-button-template-text">Views</p>
                  </div>
                </div>

                <div className="local-section1-top-left-button-template">
                  <div className="">
                    <Image
                      className="local-section1-button-arrow-up(1)2-cafe"
                      src="/images/arrow-up (1) 2.svg"
                      alt="React Logo"
                    />
                    <span className="local-section1-top-left-button-template-number">
                      {' '}
                      {props.local.up ? props.local.up : 0}
                    </span>
                  </div>
                  <div className="">
                    <p className="local-section1-top-left-button-template-text">Up Votes</p>
                  </div>
                </div>

                <div className="local-section1-top-left-button-template">
                  <div className="">
                    <Image
                      className="local-section1-button-trending-up1-cafe"
                      src="/images/trending-up 1.svg"
                      alt="React Logo"
                    />
                    <span className="local-section1-top-left-button-template-number">
                      {' '}
                      {props.local.trends ? props.local.trends : 'N/A'}
                    </span>
                  </div>
                  <div className="">
                    <p className="local-section1-top-left-button-template-text">Trends</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} className="local-col-cafe head-section">
              <div className="local-section1-button-wrapper-cafe">
                <div className="logo-img logo-img-story-active">
                  <img src="/images/story-ring.png" />
                </div>

                <Image
                  className="local-section1-button-cafe local-section1-button-cafe-for-1440 logo"
                  src={props.local.logo_img}
                  alt={props.local.name}
                />
              </div>
            </Col>
            <Col lg={4} sm={12} className="local-col-cafe">
              <div className="local-section1-top-left-button-group-wrapper-cafe">
                <div className="local-section1-top-left-button-group-cafe ">
                  <button className="btn">
                    <Image
                      className="local-top-right-button-cafe"
                      src="/images/Button-cafe-photo-1.svg"
                      alt="React Logo"
                    />
                  </button>
                  <button className="btn">
                    <Image
                      className="local-top-right-button-cafe"
                      src="/images/Button-cafe-photo-2.svg"
                      alt="React Logo"
                    />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="local-row-cafe">
            <Col className="local-col-cafe head-section-metadata">
              <p className="local-section1-brand-text1-cafe">
                {props.local.name} <br />
              </p>
              <p className="local-section1-brand-text2-cafe">
                {props.local.category.name} in {props.local.address_parsed}
              </p>
              <p className="local-section1-brand-text3-cafe">
                {props.local.description ? props.local.description : 'Keine Beschreibung vorhanden'}
              </p>
            </Col>
          </Row>
          <div className="mobile-information d-lg-none d-flex justify-content-around align-items-center flex-column flex-sm-row">
            <div className="local-section1-top-left-buttons-wrapper-cafe d-block d-flex justify-content-center">
              <div className="local-section1-top-left-button-template">
                <div className="">
                  <Image
                    className="local-section1-button-eye-cafe"
                    src="/images/eye 1.svg"
                    alt="React Logo"
                  />
                  <span className="local-section1-top-left-button-template-number">
                    {' '}
                    {props.local.stats.view ? props.local.stats.view : 0}
                  </span>
                </div>
                <div className="">
                  <p className="local-section1-top-left-button-template-text">Views</p>
                </div>
              </div>

              <div className="local-section1-top-left-button-template">
                <div className="">
                  <Image
                    className="local-section1-button-arrow-up(1)2-cafe"
                    src="/images/arrow-up (1) 2.svg"
                    alt="React Logo"
                  />
                  <span className="local-section1-top-left-button-template-number">
                    {' '}
                    {props.local.up ? props.local.up : 0}
                  </span>
                </div>
                <div className="">
                  <p className="local-section1-top-left-button-template-text">Up Votes</p>
                </div>
              </div>

              <div className="local-section1-top-left-button-template">
                <div className="">
                  <Image
                    className="local-section1-button-trending-up1-cafe"
                    src="/images/trending-up 1.svg"
                    alt="React Logo"
                  />
                  <span className="local-section1-top-left-button-template-number">
                    {' '}
                    {props.local.trends ? props.local.trends : 'N/A'}
                  </span>
                </div>
                <div className="">
                  <p className="local-section1-top-left-button-template-text">Trends</p>
                </div>
              </div>
            </div>
            <div className="local-section1-top-left-button-group-wrapper-cafe d-flex justify-content-center mt-5 mb-2 mt-sm-0 mb-sm-0 ">
              <div className="local-section1-top-left-button-group-cafe mr-auto ">
                <button className="btn">
                  <Image
                    className="local-top-right-button-cafe"
                    src="/images/Button-cafe-photo-1.svg"
                    alt="React Logo"
                  />
                </button>
                <button className="btn">
                  <Image
                    className="local-top-right-button-cafe"
                    src="/images/Button-cafe-photo-2.svg"
                    alt="React Logo"
                  />
                </button>
              </div>
            </div>
          </div>
          <Row className="local-row-cafe">
            <Col className="local-col-cafe">
              <div className="local-section1-nav-bar-wrapper">
                <Nav variant="pills" className="local-section1-nav-bar d-flex">
                  <Nav.Item onClick={() => props.setProfileSectionHandler('photo')}>
                    <Nav.Link className="d-flex align-items-center h-100">
                      <Image className="" src="/images/camera (1) 1.svg" alt="Fotos" />
                      <span className="ml-2 ml-md-3">Photos</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item onClick={() => props.setProfileSectionHandler('stories')}>
                    <Nav.Link className="d-flex align-items-center h-100">
                      <Image className="" src="/images/cafe-photo-info1-icon.svg" alt="Stories" />
                      <span className="ml-2 ml-md-3">Stories</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item onClick={() => props.setProfileSectionHandler('info')}>
                    <Nav.Link className="d-flex align-items-center h-100">
                      <Image
                        className=""
                        src="/images/cafe-photo-info2-icon.svg"
                        alt="Information"
                      />
                      <span className="ml-2 ml-md-3">Infos</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </React.Fragment>
  );
};
export default SectionHeaderWithPinkLogo;

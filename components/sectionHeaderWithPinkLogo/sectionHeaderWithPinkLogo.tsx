import React, { useEffect, useState } from 'react';
import { Col, Image, Nav, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import './sectionHeaderWithPinkLogo.scss';

const SectionHeaderWithPinkLogo = (props: any) => {
  const { profileSection, setProfileSectionHandler } = props;
  const {
    stories: { visitedLocalStories },
  } = useSelector((state: RootState) => state);

  const [clickedOpenStories, setClickedOpenStories] = useState(false);
  useEffect(() => {
    if (clickedOpenStories && profileSection === 'stories') {
      console.log(clickedOpenStories);
      setTimeout(() => {
        openStories(0);
      }, 250);
    }
  }, [clickedOpenStories]);

  const openStories = (index: number) => {
    (document.querySelectorAll('#stories-react .story')[index] as any).click();
  };

  const handleOpenStories = () => {
    if (isStoryExist()) {
      if (profileSection === 'stories') {
        openStories(0);
      } else {
        setProfileSectionHandler('stories');
        setClickedOpenStories(true);
      }
    }
  };

  const isStoryExist = () => {
    return visitedLocalStories && visitedLocalStories.length > 0;
  };

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
                      {props.local.stats && props.local.stats.length > 0
                        ? props.local.stats[1].total
                        : 0}{' '}
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
                      {props.local['0'].up ? props.local['0'].up : 0}
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
                      {props.local[0].trends ? props.local[0].trends : 'N/A'}
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
                {isStoryExist() && (
                  <div className="logo-img logo-img-story-active">
                    <img src="/images/story-ring.png" />
                  </div>
                )}

                <Image
                  className={`local-section1-button-cafe local-section1-button-cafe-for-1440 logo ${
                    isStoryExist() && 'story-exists'
                  }`}
                  src={props.local['0'].logo_img}
                  alt={props.local['0'].name}
                  onClick={handleOpenStories}
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
                {props.local['0'].name} <br />
              </p>
              <p className="local-section1-brand-text2-cafe">
                {props.local['0'].category.name} in {props.local['0'].address_parsed}
              </p>
              <p className="local-section1-brand-text3-cafe">
                {props.local['0'].description
                  ? props.local['0'].description
                  : 'Keine Beschreibung vorhanden'}
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
                    {props.local.stats && props.local.stats.length > 0
                      ? props.local.stats[1].total
                      : 0}
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
                    {props.local['0'].up ? props.local['0'].up : 0}
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
                    {props.local['0'].trends ? props.local['0'].trends : 'N/A'}
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
                  <Nav.Item
                    onClick={() =>
                      props.setProfileSectionHandler('photo', () => {
                        setClickedOpenStories(false);
                      })
                    }
                  >
                    <Nav.Link
                      className={`d-flex align-items-center h-100 ${
                        profileSection == 'photo' && 'active'
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 12.9167C10.6904 12.9167 11.25 12.357 11.25 11.6667C11.25 10.9763 10.6904 10.4167 10 10.4167C9.30964 10.4167 8.75 10.9763 8.75 11.6667C8.75 12.357 9.30964 12.9167 10 12.9167Z"
                          fill="#8FA4BD"
                        />
                        <path
                          d="M15.8332 5.83333H13.3332V4.58333C13.3332 4.0308 13.1137 3.5009 12.723 3.11019C12.3323 2.71949 11.8024 2.5 11.2498 2.5H8.74984C8.1973 2.5 7.6674 2.71949 7.2767 3.11019C6.886 3.5009 6.6665 4.0308 6.6665 4.58333V5.83333H4.1665C3.50346 5.83333 2.86758 6.09673 2.39874 6.56557C1.9299 7.03441 1.6665 7.67029 1.6665 8.33333V15C1.6665 15.663 1.9299 16.2989 2.39874 16.7678C2.86758 17.2366 3.50346 17.5 4.1665 17.5H15.8332C16.4962 17.5 17.1321 17.2366 17.6009 16.7678C18.0698 16.2989 18.3332 15.663 18.3332 15V8.33333C18.3332 7.67029 18.0698 7.03441 17.6009 6.56557C17.1321 6.09673 16.4962 5.83333 15.8332 5.83333ZM8.33317 4.58333C8.33317 4.47283 8.37707 4.36685 8.45521 4.28871C8.53335 4.21057 8.63933 4.16667 8.74984 4.16667H11.2498C11.3603 4.16667 11.4663 4.21057 11.5445 4.28871C11.6226 4.36685 11.6665 4.47283 11.6665 4.58333V5.83333H8.33317V4.58333ZM9.99984 14.5833C9.42298 14.5833 8.85907 14.4123 8.37942 14.0918C7.89978 13.7713 7.52594 13.3158 7.30519 12.7828C7.08443 12.2499 7.02667 11.6634 7.13921 11.0977C7.25175 10.5319 7.52954 10.0122 7.93744 9.60427C8.34535 9.19637 8.86505 8.91858 9.43082 8.80604C9.9966 8.6935 10.583 8.75126 11.116 8.97202C11.6489 9.19277 12.1045 9.56661 12.425 10.0463C12.7454 10.5259 12.9165 11.0898 12.9165 11.6667C12.9165 12.4402 12.6092 13.1821 12.0622 13.7291C11.5153 14.276 10.7734 14.5833 9.99984 14.5833Z"
                          fill="#8FA4BD"
                        />
                      </svg>
                      <span className="ml-2 ml-md-3">Photos</span>
                    </Nav.Link>
                  </Nav.Item>
                  {visitedLocalStories && visitedLocalStories.length > 0 && (
                    <Nav.Item onClick={() => props.setProfileSectionHandler('stories')}>
                      <Nav.Link
                        className={`d-flex align-items-center h-100 ${
                          profileSection == 'stories' && 'active'
                        }`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.9999 12.5C14.3453 12.5006 13.7169 12.7579 13.2499 13.2167L6.66661 10.2833V10V9.72501L13.2499 6.78335C13.6623 7.18753 14.2018 7.43652 14.7769 7.48802C15.352 7.53953 15.9272 7.39038 16.4048 7.0659C16.8825 6.74143 17.233 6.26163 17.397 5.70801C17.561 5.15438 17.5283 4.56106 17.3044 4.02881C17.0806 3.49656 16.6794 3.05821 16.169 2.78819C15.6587 2.51817 15.0706 2.43315 14.5046 2.54755C13.9386 2.66196 13.4297 2.96874 13.0643 3.41579C12.6989 3.86285 12.4995 4.42261 12.4999 5.00001V5.28335L5.91661 8.21668C5.56525 7.87148 5.11973 7.63776 4.636 7.54487C4.15227 7.45198 3.65187 7.50406 3.19764 7.69457C2.7434 7.88508 2.35556 8.20553 2.08281 8.61569C1.81006 9.02585 1.66455 9.50744 1.66455 10C1.66455 10.4926 1.81006 10.9742 2.08281 11.3843C2.35556 11.7945 2.7434 12.115 3.19764 12.3055C3.65187 12.496 4.15227 12.548 4.636 12.4552C5.11973 12.3623 5.56525 12.1286 5.91661 11.7833L12.4999 14.725V15C12.4999 15.4945 12.6466 15.9778 12.9213 16.3889C13.196 16.8001 13.5864 17.1205 14.0432 17.3097C14.5001 17.4989 15.0027 17.5484 15.4877 17.452C15.9726 17.3555 16.4181 17.1174 16.7677 16.7678C17.1173 16.4182 17.3554 15.9727 17.4519 15.4877C17.5484 15.0028 17.4989 14.5001 17.3096 14.0433C17.1204 13.5865 16.8 13.196 16.3889 12.9213C15.9777 12.6466 15.4944 12.5 14.9999 12.5Z"
                            fill="#8FA4BD"
                          />
                        </svg>

                        <span className="ml-2 ml-md-3">Stories</span>
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  <Nav.Item
                    onClick={() =>
                      props.setProfileSectionHandler('info', () => {
                        setClickedOpenStories(false);
                      })
                    }
                  >
                    <Nav.Link
                      className={`d-flex align-items-center h-100 ${
                        profileSection == 'info' && 'active'
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.99984 1.66666C8.35166 1.66666 6.7405 2.1554 5.37009 3.07108C3.99968 3.98675 2.93158 5.28824 2.30084 6.81096C1.67011 8.33368 1.50509 10.0092 1.82663 11.6257C2.14817 13.2422 2.94185 14.7271 4.10728 15.8925C5.27272 17.058 6.75758 17.8517 8.37409 18.1732C9.9906 18.4947 11.6662 18.3297 13.1889 17.699C14.7116 17.0683 16.0131 16.0001 16.9288 14.6297C17.8444 13.2593 18.3332 11.6482 18.3332 9.99999C18.3332 8.90564 18.1176 7.82201 17.6988 6.81096C17.28 5.79991 16.6662 4.88125 15.8924 4.10743C15.1186 3.33361 14.1999 2.71978 13.1889 2.30099C12.1778 1.8822 11.0942 1.66666 9.99984 1.66666ZM10.8332 13.3333C10.8332 13.5543 10.7454 13.7663 10.5891 13.9226C10.4328 14.0789 10.2209 14.1667 9.99984 14.1667C9.77883 14.1667 9.56687 14.0789 9.41059 13.9226C9.25431 13.7663 9.16651 13.5543 9.16651 13.3333V9.16666C9.16651 8.94564 9.25431 8.73368 9.41059 8.5774C9.56687 8.42112 9.77883 8.33332 9.99984 8.33332C10.2209 8.33332 10.4328 8.42112 10.5891 8.5774C10.7454 8.73368 10.8332 8.94564 10.8332 9.16666V13.3333ZM9.99984 7.49999C9.83502 7.49999 9.67391 7.45112 9.53687 7.35955C9.39982 7.26798 9.29301 7.13783 9.22994 6.98556C9.16687 6.83329 9.15037 6.66573 9.18252 6.50408C9.21467 6.34243 9.29404 6.19394 9.41059 6.0774C9.52713 5.96086 9.67562 5.88149 9.83727 5.84933C9.99892 5.81718 10.1665 5.83368 10.3187 5.89676C10.471 5.95983 10.6012 6.06664 10.6927 6.20368C10.7843 6.34072 10.8332 6.50184 10.8332 6.66666C10.8332 6.88767 10.7454 7.09963 10.5891 7.25591C10.4328 7.41219 10.2209 7.49999 9.99984 7.49999Z"
                          fill="#8FA4BD"
                        />
                      </svg>
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

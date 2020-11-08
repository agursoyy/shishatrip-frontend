import { map } from 'jquery';
import dynamic from 'next/dynamic';
import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { RootState } from '../../stores';

const Map = dynamic(
  () => import('../map'), // replace '@components/map' with your component's location
  { ssr: false }, // This line is important. It's what prevents server-side render
);
const SectionInfo = (props: any) => {
  const {
    locations: { visitedLocalData },
  } = useSelector((state: RootState) => state);
  return (
    <React.Fragment>
      <div className="local-section1-info-wrapper-cafe ">
        <Row className="local-row-cafe">
          <Col className="local-col-cafe">
            <div className="local-section1-info-map-wrapper-cafe mb-4">
              <Map
                location={[visitedLocalData.lat, visitedLocalData.lng]}
                locationName={visitedLocalData.name}
                locationAddress={visitedLocalData.address_parsed}
              />
            </div>
          </Col>
        </Row>
        <Row className="local-row-cafe local-section1-info-buttons-wrapper1-cafe">
          <Col xs={6} sm={6} md={4} lg={4} className="local-col-cafe local-col-border-bottom-right">
            <div className="local-section1-info-button-innerwrapper-cafe">
              <div className="local-section1-info-button-lg-image-wrapper-cafe">
                <Image className="" src="/images/navigation-2 (1) 1.svg" alt="React Logo" fluid />
              </div>
              <div className="local-section1-info-button-xs-image-wrapper-cafe">
                <Image className="" src="/images/navigation-2 (1) 1.svg" alt="React Logo" fluid />
              </div>
              <p className="local-section1-info-button-lg-title-cafe">Address</p>
              <p className="local-section1-info-button-lg-subtitle-cafe">
                {visitedLocalData.address_parsed}
              </p>
              <div>
                <p className="local-section1-info-button-xs-title-cafe">Address</p>
                <p className="local-section1-info-button-xs-subtitle-cafe">
                  {visitedLocalData.address_parsed}
                </p>
              </div>
            </div>
          </Col>
          <Col xs={6} sm={6} md={4} lg={4} className="local-col-cafe local-col-border-bottom">
            <div className="local-section1-info-button-innerwrapper-cafe">
              <div className="local-section1-info-button-lg-image-wrapper-cafe">
                <Image className="" src="/images/navigation-2 (1) 2.svg" alt="React Logo" fluid />
              </div>
              <div className="local-section1-info-button-xs-image-wrapper-cafe">
                <Image className="" src="/images/navigation-2 (1) 2.svg" alt="React Logo" fluid />
              </div>
              <p className="local-section1-info-button-lg-title-cafe">Telephone</p>
              <p className="local-section1-info-button-lg-subtitle-cafe">
                {visitedLocalData.telephone}
              </p>
              <div>
                <p className="local-section1-info-button-xs-title-cafe">Telephone</p>
                <p className="local-section1-info-button-xs-subtitle-cafe">
                  {visitedLocalData.telephone}
                </p>
              </div>
            </div>
          </Col>

          <Col xs={6} sm={6} md={4} lg={4} className="local-col-cafe local-col-border-top-right">
            <div className="local-section1-info-button-innerwrapper-cafe">
              <div className="local-section1-info-button-lg-image-wrapper-cafe">
                <Image className="" src="/images/browser 1.svg" alt="React Logo" fluid />
              </div>
              <div className="local-section1-info-button-xs-image-wrapper-cafe">
                <Image className="" src="/images/browser 1.svg" alt="React Logo" fluid />
              </div>
              <p className="local-section1-info-button-lg-title-cafe">Website</p>
              <p className="local-section1-info-button-lg-subtitle-cafe">
                <a href={visitedLocalData.website}>{visitedLocalData.website}</a>
              </p>
              <div>
                <p className="local-section1-info-button-xs-title-cafe">Website</p>
                <p className="local-section1-info-button-xs-subtitle-cafe">
                  <a href={visitedLocalData.website}>{visitedLocalData.website}</a>
                </p>
              </div>
            </div>
          </Col>
          <Col xs={0} sm={0} md={0} lg={2} className={'d-none d-lg-block'}></Col>

          <Col
            xs={6}
            sm={6}
            md={6}
            lg={4}
            className="local-col-cafe local-section1-info-button-temp-innerwrapper-cafe local-col-border-top local-col-border-bottom "
          >
            <div className="local-section1-info-button-innerwrapper-cafe">
              <div className="local-section1-info-button-lg-image-wrapper-cafe">
                <Image className="" src="/images/browser 2.svg" alt="React Logo" fluid />
              </div>
              <div className="local-section1-info-button-xs-image-wrapper-cafe">
                <Image className="" src="/images/browser 2.svg" alt="React Logo" fluid />
              </div>
              <p className="local-section1-info-button-lg-title-cafe">Category</p>
              <p className="local-section1-info-button-lg-subtitle-cafe">
                {visitedLocalData.category.name}
              </p>
              <div>
                <p className="local-section1-info-button-xs-title-cafe">Category</p>
                <p className="local-section1-info-button-xs-subtitle-cafe">
                  {visitedLocalData.category.name}
                </p>
              </div>
            </div>
          </Col>

          <Col xs={12} sm={12} md={6} lg={4} className="local-col-cafe  local-col-border-top ">
            <div className="local-section1-info-button-innerwrapper-cafe">
              <div className="local-section1-info-button-lg-image-wrapper-cafe">
                <Image className="" src="/images/navigation-2 (1) 3.svg" alt="React Logo" fluid />
              </div>
              <div className="local-section1-info-button-xs-image-wrapper-cafe">
                <Image className="" src="/images/navigation-2 (1) 3.svg" alt="React Logo" fluid />
              </div>
              <p className="local-section1-info-button-lg-title-cafe">Work Hours</p>
              {visitedLocalData.opening_hours && visitedLocalData.opening_hours.length === 7 && (
                <>
                  <p className="local-section1-info-button-lg-subtitle-cafe mb-2">
                    <span className="font-weight-bold mr-2">Montag - Freitag :</span>
                    {visitedLocalData.opening_hours[0].open}
                    {'Uhr - '}
                    {visitedLocalData.opening_hours[0].close}
                    {' Uhr'}
                  </p>
                  <p className="local-section1-info-button-lg-subtitle-cafe mb-2">
                    <span className="font-weight-bold mr-2">Samstag :</span>
                    {visitedLocalData.opening_hours[5].open}
                    {' Uhr - '}
                    {visitedLocalData.opening_hours[5].close}
                    {' Uhr'}
                  </p>
                  <p className="local-section1-info-button-lg-subtitle-cafe">
                    <span className="font-weight-bold mr-2">Sonntag :</span>

                    {visitedLocalData.opening_hours[6].open}
                    {' Uhr - '}
                    {visitedLocalData.opening_hours[6].close}
                    {' Uhr'}
                  </p>
                  <div>
                    <p className="local-section1-info-button-xs-title-cafe">Work Hours</p>
                    <div className="local-section1-info-button-xs-subtitle-cafe">
                      <p className="local-section1-info-button-xs-subtitle-cafe mb-2">
                        Montag - Freitag : {visitedLocalData.opening_hours[0].open}
                        {' Uhr - '}
                        {visitedLocalData.opening_hours[0].close}
                        {' Uhr'}
                      </p>
                      <p className="local-section1-info-button-xs-subtitle-cafe mb-2">
                        {' '}
                        Samstag : {visitedLocalData.opening_hours[5].open}
                        {' Uhr - '}
                        {visitedLocalData.opening_hours[5].close}
                        {' Uhr'}
                      </p>
                      <p className="local-section1-info-button-xs-subtitle-cafe">
                        {' '}
                        Sonntag : {visitedLocalData.opening_hours[6].open}
                        {' Uhr - '}
                        {visitedLocalData.opening_hours[6].close}
                        {' Uhr'}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className="local-section1-info-xs-features-cafe">
        <p className="local-section1-info-features-label-cafe">Cafe Features</p>
        <div className="local-section1-info-featurebuttons-wrapper-cafe">
          <Row className="local-row-cafe">
            <Col xs={3} className="local-col-cafe">
              <div className="local-section1-info-featurebuttons-innerwrapper-cafe">
                <Image className="" src="/images/television 1.png" alt="React Logo" fluid />
                <p className="local-section1-info-featurebuttons-comment-cafe">TV</p>
              </div>
            </Col>
            <Col xs={3} className="local-col-cafe">
              <div className="local-section1-info-featurebuttons-innerwrapper-cafe">
                <Image className="" src="/images/soft-drink 1.png" alt="React Logo" fluid />
                <p className="local-section1-info-featurebuttons-comment-cafe">Drink</p>
              </div>
            </Col>
            <Col xs={3} className="local-col-cafe">
              <div className="local-section1-info-featurebuttons-innerwrapper-cafe">
                <Image className="" src="/images/credit-card 1.png" alt="React Logo" fluid />
                <p className="local-section1-info-featurebuttons-comment-cafe">POS</p>
              </div>
            </Col>
            <Col xs={3} className="local-col-cafe">
              <div className="local-section1-info-featurebuttons-innerwrapper-cafe">
                <Image className="" src="/images/football 1.png" alt="React Logo" fluid />
                <p className="local-section1-info-featurebuttons-comment-cafe">Drink</p>
              </div>
            </Col>
          </Row>
          <Row className="local-row-cafe">
            <Col xs={3} className="local-col-cafe">
              <div className="local-section1-info-featurebuttons-innerwrapper-cafe"></div>
            </Col>
            <Col xs={3} className="local-col-cafe">
              <div className="local-section1-info-featurebuttons-innerwrapper-cafe">
                <Image className="" src="/images/soft-drink 1.png" alt="React Logo" fluid />
                <p className="local-section1-info-featurebuttons-comment-cafe">TV</p>
              </div>
            </Col>
            <Col xs={3} className="local-col-cafe">
              <div className="local-section1-info-featurebuttons-innerwrapper-cafe">
                <Image className="" src="/images/credit-card 1.png" alt="React Logo" fluid />
                <p className="local-section1-info-featurebuttons-comment-cafe">POS</p>
              </div>
            </Col>
            <Col xs={3} className="local-col-cafe">
              <div className="local-section1-info-featurebuttons-innerwrapper-cafe"></div>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SectionInfo;

import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import './sectionStories.scss';
import { generate_stories_format } from '../../stores/stories/actions';
import LazyLoad from 'react-lazyload';
import Loading from '../loading';

const ViewStories = dynamic(() => import('../viewStories'));

const SectionStories: FC<any> = () => {
  const {
    stories: { visitedLocalStories },
    locations: { visitedLocalData },
  } = useSelector((state: RootState) => state);

  const openStories = (index: number) => {
    (document.querySelectorAll('#stories-react .story')[index] as any).click();
  };

  const stories_to_send = generate_stories_format(visitedLocalStories, visitedLocalData);
  return (
    <div className="local-section1-stories-wrapper-cafe  section-stories-container">
      <div className="row ml-0 mr-0">
        <div className="col col-6 col-md-4">
          <ViewStories stories={stories_to_send} />
        </div>
        {visitedLocalStories &&
          visitedLocalStories.map(
            (story: any, index: number) =>
              index > 0 && (
                <div className="col col-6 col-md-4" key={index}>
                  <LazyLoad placeholder={<Loading />} classNamePrefix="local-story-item-lazyload">
                    <button
                      className="btn local-story-item"
                      onClick={() => {
                        openStories(0);
                      }}
                    >
                      <img className="local-story-item__img" src={story.url} />
                      <img className="local-story-item__logo" src={visitedLocalData.logo_img} />
                    </button>
                  </LazyLoad>
                </div>
              ),
          )}
      </div>

      <Row className="row-local d-none">
        <Col xs={6} sm={6} md={4} lg={4} className="col-local">
          <div className="local-section1-portfolio-image-wrapper-cafe">
            <div className="small-tile-image-holder-for-section-stories">
              <img className="small-tile-image-for-section-stories" src="/images/SmallTile1.svg" />
              <img className="small-tile-logo" src="/images/RoundLogo1.svg" />
            </div>
          </div>
        </Col>
        <Col xs={6} sm={6} md={4} lg={4} className="col-local">
          <div className="local-section1-portfolio-image-wrapper-cafe">
            <div className="small-tile-image-holder-for-section-stories">
              <img className="small-tile-image-for-section-stories" src="/images/SmallTile2.svg" />
              <img className="small-tile-logo" src="/images/RoundLogo1.svg" />
            </div>
          </div>
        </Col>
        <Col xs={6} sm={6} md={4} lg={4} className="col-local">
          <div className="local-section1-portfolio-image-wrapper-cafe">
            <div className="small-tile-image-holder-for-section-stories">
              <img className="small-tile-image-for-section-stories" src="/images/SmallTile3.svg" />
              <img className="small-tile-logo" src="/images/RoundLogo1.svg" />
            </div>
          </div>
        </Col>
        <Col xs={6} sm={6} md={4} lg={4} className="col-local">
          <div className="local-section1-portfolio-image-wrapper-cafe">
            <div className="small-tile-image-holder-for-section-stories">
              <img className="small-tile-image-for-section-stories" src="/images/SmallTile4.svg" />
              <img className="small-tile-logo" src="/images/RoundLogo1.svg" />
            </div>
          </div>
        </Col>
        <Col xs={6} sm={6} md={4} lg={4} className="col-local">
          <div className="local-section1-portfolio-image-wrapper-cafe">
            <div className="small-tile-image-holder-for-section-stories">
              <img className="small-tile-image-for-section-stories" src="/images/RoomPic1.svg" />
              <img className="small-tile-logo" src="/images/RoundLogo1.svg" />
            </div>
          </div>
        </Col>
        <Col xs={6} sm={6} md={4} lg={4} className="col-local">
          <div className="local-section1-portfolio-image-wrapper-cafe">
            <div className="small-tile-image-holder-for-section-stories">
              <img className="small-tile-image-for-section-stories" src="/images/RoomPic2.svg" />
              <img className="small-tile-logo" src="/images/RoundLogo1.svg" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default SectionStories;

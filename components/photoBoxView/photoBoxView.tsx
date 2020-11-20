import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './photoBoxView.scss';

const getConfigurableProps = () => ({
  showArrows: true,
  showStatus: false,
  showIndicators: true,
  infiniteLoop: true,
  showThumbs: false,
  useKeyboardArrows: true,
  autoPlay: false,
  stopOnHover: true,
  swipeable: true,
  dynamicHeight: true,
  emulateTouch: true,
  thumbWidth: 100,
  selectedItem: 0,
  interval: 3000,
  transitionTime: 150,
  swipeScrollTolerance: 5,
});

const PhotoBoxView = (props: any) => {
  const { closeGallery } = props;
  return (
    <div style={{ position: 'relative' }}>
      <button
        className="close-btn"
        onClick={() => {
          closeGallery();
        }}
      >
        X
      </button>

      <Carousel {...getConfigurableProps()} selectedItem={props.selectedItem}>
        {props.images &&
          props.images.map((img: any, index: number) => (
            <div
              className={'profile-gallery-images'}
              style={{ backgroundImage: `url(${img.path})` }}
              key={index}
            />
          ))}
      </Carousel>
    </div>
  );
};

export default PhotoBoxView;

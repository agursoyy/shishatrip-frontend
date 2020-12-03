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
        className="photoboxview-close-btn"
        onClick={() => {
          closeGallery();
        }}
      >
        <svg
          aria-label="Close"
          className="close-icon"
          fill="#ffffff"
          height="24"
          viewBox="0 0 48 48"
          width="24"
        >
          <path
            clip-rule="evenodd"
            d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
            fill-rule="evenodd"
          ></path>
        </svg>
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

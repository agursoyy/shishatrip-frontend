import './authLeftside.scss';
import Slider from 'react-slick';

const AuthLeftSide = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
    autoPlaySpeed: 3000,
  };
  return (
    <div className="auth-left-side-wrapper">
      <div className="row mr-0 ml-0 justify-content-center">
        <div className="col-md-10 col-lg-9 col-xl-7">
          <Slider {...settings}>
            <div className="text-container">
              <h2 className="text-title">Why do we use it?</h2>
              <p className="text-body">
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout.
              </p>
            </div>
            <div className="text-container">
              <h2 className="text-title">Why do we use it?</h2>
              <p className="text-body">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum h
              </p>
            </div>
            <div className="text-container">
              <h2 className="text-title">Why do we use it?</h2>
              <p className="text-body">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's s
              </p>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default AuthLeftSide;

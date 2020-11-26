import { useEffect, useRef } from 'react';
import './returnToTop.scss';

const ReturnToTop = () => {
  const returnToTopRef = useRef<HTMLDivElement | any>(null);

  function fadeIn(interval: number) {
    if (
      returnToTopRef &&
      returnToTopRef.current &&
      returnToTopRef.current.style.display == 'none'
    ) {
      returnToTopRef.current.style.display = 'inline';
      returnToTopRef.current.style.opacity = '0';
      var opacity = 0;
      var intervalID = setInterval(function () {
        if (opacity < 1) {
          opacity = opacity + 0.1;
          (returnToTopRef.current as any).style.opacity = opacity.toString();
        } else {
          clearInterval(intervalID);
        }
      }, interval);
    }
  }
  function fadeOut(interval: number) {
    if (
      returnToTopRef &&
      returnToTopRef.current &&
      returnToTopRef.current.style.display != 'none'
    ) {
      var opacity = 1;
      var intervalID = setInterval(function () {
        if (opacity > 0) {
          opacity = opacity - 0.1;
          (returnToTopRef.current as any).style.opacity = opacity.toString();
        } else {
          clearInterval(intervalID);
          (returnToTopRef.current as any).style.display = 'none';
        }
      }, interval);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', function (e) {
      var body = document.body;
      var docElem = document.documentElement;
      var height = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      if (height >= 450) {
        fadeIn(50);
      } else {
        fadeOut(20);
      }
    });

    if (returnToTopRef && returnToTopRef.current) {
      returnToTopRef.current.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, []);
  return (
    <a id="return-to-top" style={{ display: 'none' }} ref={returnToTopRef}>
      <i className="fa fa-chevron-up"></i>{' '}
    </a>
  );
};
export default ReturnToTop;

import { useEffect, useRef } from 'react';
import './returnToTop.scss';

const ReturnToTop = () => {
  const returnToTopRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    window.addEventListener('scroll', function (e) {
      var body = document.body;
      var docElem = document.documentElement;
      var height = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      if (height >= 450) {
        // fadeIn(50);
        returnToTopRef.current && returnToTopRef.current.classList.add('scrolled');
      } else {
        // fadeOut(20);
        returnToTopRef.current && returnToTopRef.current.classList.remove('scrolled');
        returnToTopRef.current && returnToTopRef.current.classList.remove('animate-btn');
      }
    });

    if (returnToTopRef && returnToTopRef.current) {
      returnToTopRef.current.addEventListener('click', function () {
        returnToTopRef.current && returnToTopRef.current.classList.add('animate-btn');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, []);
  return (
    <a id="return-to-top" ref={returnToTopRef}>
      <img src="/icons/up-arrow-angle.svg" className="arrow-up" />
    </a>
  );
};
export default ReturnToTop;

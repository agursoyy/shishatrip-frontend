import { useEffect } from 'react';
import './returnToTop.scss';
import $ from 'jquery';
const ReturnToTop = () => {
  function scrollDetect() {
    window.onscroll = function (e: any) {
      // print "false" if direction is down and "true" if up
      console.log((this as any).oldScroll > this.scrollY);
      if ((this as any).oldScroll > this.scrollY) {
        $('#return-to-top').removeClass('hidden');
      } else {
        $('#return-to-top').addClass('hidden');
      }
      (this as any).oldScroll = this.scrollY;
    };
  }

  useEffect(() => {
    $(window).scroll(function () {
      if (($(this) as any).scrollTop() >= 450) {
        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200); // Fade in the arrow
      } else {
        $('#return-to-top').fadeOut(200); // Else fade out the arrow
      }
    });
    $('#return-to-top').click(function () {
      // When arrow is clicked
      $('body,html').animate(
        {
          scrollTop: 0, // Scroll to top of body
        },
        500,
      );
    });
  }, []);
  return (
    <a href="javascript:" id="return-to-top">
      <i className="fa fa-chevron-up"></i>{' '}
    </a>
  );
};
export default ReturnToTop;

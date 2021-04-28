import React, {useEffect, useState} from 'react';
import {useWindowScroll} from 'react-use';
import { FaArrowAltCircleUp } from 'react-icons/fa'

function ScrollTop() {
  const {y: pageYOffset} = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pageYOffset]);

  const scrollToTop = () => {
    return window.scrollTo({top: 0, behavior: 'smooth'});
  };

  if (!visible) {
    return false;
  }

  return (
    <div className="scroll-to-top-wrapper" onClick={scrollToTop}>
      <FaArrowAltCircleUp size={40} />
    </div>
  );
}

export default ScrollTop;
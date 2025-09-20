import React, { useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';

// import { History } from 'history'; // Removed, use history from react-router-dom props

function ScrollToTop({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Fragment>{children}</Fragment>;
}

export default ScrollToTop;
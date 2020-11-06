import React from 'react';
import './header.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <header className="header--desktop">
      <nav>
        <div className="nav-item">
          <Link href="/">
            <a className="navbar-brand">
              <img src="/images/logo.png" alt="_logo" />
            </a>
          </Link>
        </div>
        <div className={`nav-item ${pathname === '/' && 'active'}`}>
          <Link href="/">
            <a className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a5adc4"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/">
            <a className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a5adc4"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>{' '}
            </a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/">
            <a className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a5adc4"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>{' '}
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React from 'react';
import './header.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">
          <a className="navbar-brand">
            <img src="/images/shishatrip_small_logo_pink.png" alt="logo" />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="" role="button">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link href="/login">
                <a className="nav-link" href="#">
                  Eintragen
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/register">
                <a className="nav-link" href="#">
                  <button className="auth-btn">Register</button>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

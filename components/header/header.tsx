import React from 'react';
import './header.scss';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Header = () => {
  const router = useRouter();
  const {pathname} = router;
  return (
      <React.Fragment>
        <header className="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/">
              <a className="navbar-brand">
                <img src="/images/shishatrip_small_logo_pink.png" alt="logo"/>
              </a>
            </Link>
            <button
                className="navbar-toggler d-none"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="#navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            <span className="" role="button">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
            </button>

            <button
                className="navbar-toggler d-none"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
              <span className="sr-only">Toggle navigation</span>
            </button>
            <button
                className="navbar-toggler navbar-toggler-right collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
              <span> </span>
              <span> </span>
              <span> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                      <button className="auth-btn">
                      <span>
                      <img src="/images/icons/menu.svg"/>
                      </span>
                        <span>
                      <img src="/images/icons/user.svg"/>
                      </span>
                      </button>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="header-bg"/>
      </React.Fragment>
  );
};

export default Header;

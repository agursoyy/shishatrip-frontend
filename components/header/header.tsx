import React from 'react';
import './header.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <header className="header">
      <nav>
        <div className="nav-item">
          <Link href="/auth">
            <button className="auth-button btn nav-link">Register</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

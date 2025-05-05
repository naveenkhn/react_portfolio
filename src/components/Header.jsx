// components/Header.jsx
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);

  // Hide header on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowHeader(true);
      } else if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${showHeader ? '' : 'hidden'}`}>
      <a href="#home" className="home-button diamond">
        <span className="diamond-text">N</span>
      </a>
      <nav className="nav-links">
        <a href="#home" className="nav-item"><span>01.</span> About</a>
        <a href="#experience" className="nav-item"><span>02.</span> Experience</a>
        <a href="#skills" className="nav-item"><span>03.</span> Skills</a>
        <a href="#work" className="nav-item"><span>04.</span> Work</a>
        <a href="#contact" className="nav-item"><span>05.</span> Contact</a>
      </nav>
    </header>
  );
};

export default Header;
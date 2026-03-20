// Header component that animates in on load and hides on scroll down
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Show/hide header on scroll: hides when scrolling down, shows when scrolling up or near top
  // Hide header on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (menuOpen) {
        setShowHeader(true);
        lastScrollY = window.scrollY;
        return;
      }
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
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // framer-motion variant for staggered animation of nav items
  const navVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  // framer-motion variant for individual nav item animation
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  // Render header with animated entrance and dynamic visibility based on scroll
  return (
    <>
      <motion.header
        // motion.header enables entrance animation and toggles class based on scroll visibility
        className="header"
        style={{ display: showHeader ? 'flex' : 'none' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        <a href="#home" className="home-button diamond" onClick={() => setMenuOpen(false)}>
          <span className="diamond-text">N</span>
        </a>

        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`menu-icon ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
        </button>

        <motion.nav
          className="nav-links"
          variants={navVariants}
          initial="hidden"
          animate="show"
        >
          <motion.a href="#home" className="nav-item" variants={itemVariants}><span>01.</span> About</motion.a>
          <motion.a href="#experience" className="nav-item" variants={itemVariants}><span>02.</span> Experience</motion.a>
          <motion.a href="#skills" className="nav-item" variants={itemVariants}><span>03.</span> Skills</motion.a>
          <motion.a href="#work" className="nav-item" variants={itemVariants}><span>04.</span> Work</motion.a>
          <motion.a href="#contact" className="nav-item" variants={itemVariants}><span>05.</span> Contact</motion.a>
        </motion.nav>
      </motion.header>

      <div
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        style={{ display: showHeader ? 'block' : 'none' }}
        onClick={() => setMenuOpen(false)}
        role="presentation"
      >
        <nav
          className="mobile-menu"
          aria-label="Mobile navigation"
          onClick={(e) => e.stopPropagation()}
        >
          <a className="mobile-menu-item" href="#home" onClick={() => setMenuOpen(false)}>About</a>
          <a className="mobile-menu-item" href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a className="mobile-menu-item" href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a className="mobile-menu-item" href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a className="mobile-menu-item" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </div>
    </>
  );
};

export default Header;

// Header component that animates in on load and hides on scroll down
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);

  // Show/hide header on scroll: hides when scrolling down, shows when scrolling up or near top
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
    <motion.header
      // motion.header enables entrance animation and toggles class based on scroll visibility
      className="header"
      style={{ display: showHeader ? 'flex' : 'none' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
    >
      <a href="#home" className="home-button diamond">
        <span className="diamond-text">N</span>
      </a>
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
  );
};

export default Header;
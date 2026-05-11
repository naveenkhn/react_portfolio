// Header component that animates in on load and hides on scroll down
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const dotX = typeof window !== 'undefined' && window.innerWidth <= 900 ? 63 : 65;
  const [showHeader, setShowHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const navItemRefs = useRef({});

  const navItems = useMemo(
    () => [
      { id: 'home', href: '#home', label: 'About' },
      { id: 'experience', href: '#experience', label: 'Experience' },
      { id: 'skills', href: '#skills', label: 'Skills' },
      { id: 'work', href: '#work', label: 'Work' },
      { id: 'writing', href: '#writing', label: 'Blog' },
      { id: 'contact', href: '#contact', label: 'Contact' },
    ],
    []
  );

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

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    // Initialize from hash if present.
    const hashId = window.location.hash?.replace('#', '');
    if (hashId && ids.includes(hashId)) {
      setActiveSection(hashId);
    }

    const resolveActiveSection = () => {
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const viewportTop = headerHeight;
      const viewportBottom = window.innerHeight;
      let nextActive = ids[0];
      let maxVisibleHeight = -1;
      let fallbackDistance = Number.POSITIVE_INFINITY;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, viewportTop);
        const visibleBottom = Math.min(rect.bottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          nextActive = element.id;
        }

        if (visibleHeight === maxVisibleHeight && visibleHeight > 0) {
          const sectionCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportTop + (viewportBottom - viewportTop) / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < fallbackDistance) {
            fallbackDistance = distance;
            nextActive = element.id;
          }
        }
      });

      setActiveSection(nextActive);
    };

    const raf = window.requestAnimationFrame(resolveActiveSection);
    window.addEventListener('scroll', resolveActiveSection, { passive: true });
    window.addEventListener('resize', resolveActiveSection);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', resolveActiveSection);
      window.removeEventListener('resize', resolveActiveSection);
    };
  }, [navItems]);

  useEffect(() => {
    const updateIndicator = () => {
      const navEl = navRef.current;
      const activeEl = navItemRefs.current[activeSection];
      if (!navEl || !activeEl) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const navRect = navEl.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      const left = Math.round(itemRect.left - navRect.left);
      const width = Math.round(itemRect.width);
      setIndicator({ left, width, opacity: 1 });
    };

    const raf = window.requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection]);

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
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        <a href="#home" className="home-button diamond" onClick={() => setMenuOpen(false)}>
          <svg className="diamond-mark" viewBox="0 0 100 100" aria-hidden="true">
            <text
              x="50"
              y="52"
              textAnchor="middle"
              dominantBaseline="middle"
              className="diamond-letter"
            >
              N
            </text>
            <text
              x={dotX}
              y="52"
              textAnchor="start"
              dominantBaseline="middle"
              className="diamond-dot"
            >
              .
            </text>
          </svg>
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
          ref={navRef}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              variants={itemVariants}
              ref={(el) => {
                if (el) navItemRefs.current[item.id] = el;
              }}
              onClick={() => {
                setActiveSection(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </motion.a>
          ))}
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              left: `${indicator.left}px`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />
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
          {navItems.map((item) => (
            <a
              key={item.id}
              className={`mobile-menu-item ${activeSection === item.id ? 'active' : ''}`}
              href={item.href}
              onClick={() => {
                setActiveSection(item.id);
                setMenuOpen(false);
              }}
            >
              <span className="mobile-menu-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;

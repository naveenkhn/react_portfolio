// components/About.jsx
import React, { useEffect, useMemo, useState } from 'react';
import './About.css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const fullGreeting = "Hey, I'm NAVEEN.";
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [typedLength, setTypedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoTouchActive, setPhotoTouchActive] = useState(false);
  const photoRef = React.useRef(null);

  useEffect(() => {
    if (!inView) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedLength(fullGreeting.length);
      return undefined;
    }

    let timeoutId;

    if (!isDeleting && typedLength < fullGreeting.length) {
      timeoutId = window.setTimeout(() => {
        setTypedLength((prev) => prev + 1);
      }, 120);
    } else if (!isDeleting && typedLength === fullGreeting.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    } else if (isDeleting && typedLength > 0) {
      timeoutId = window.setTimeout(() => {
        setTypedLength((prev) => prev - 1);
      }, 65);
    } else if (isDeleting && typedLength === 0) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
      }, 260);
    }

    return () => window.clearTimeout(timeoutId);
  }, [fullGreeting.length, inView, isDeleting, typedLength]);

  const typedGreeting = useMemo(() => fullGreeting.slice(0, typedLength), [fullGreeting, typedLength]);

  const isTouchLikeDevice = () =>
    window.matchMedia('(hover: none), (pointer: coarse)').matches ||
    navigator.maxTouchPoints > 0 ||
    'ontouchstart' in window;

  useEffect(() => {
    if (!photoTouchActive) return undefined;

    const isTouchLike = isTouchLikeDevice();
    if (!isTouchLike) return undefined;

    const handleDocumentClick = (event) => {
      if (!photoRef.current?.contains(event.target)) {
        setPhotoTouchActive(false);
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, [photoTouchActive]);

  const togglePhotoTouchActive = (event) => {
    const isTouchLike = isTouchLikeDevice();
    if (!isTouchLike) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setPhotoTouchActive((prev) => !prev);
  };

  return (
    <motion.section
      ref={ref}
      id="home"
      className="about-section"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
    >
      <div className="about-section-content">
        <div className="greeting-container">
          <h1 className="typed-greeting-heading" aria-label={fullGreeting}>
            <span className="typed-greeting-ghost" aria-hidden="true">{fullGreeting}</span>
            <span className="typed-greeting-live" aria-hidden="true">
              <span className="typed-greeting-text">{typedGreeting}</span>
              <span className="typing-cursor">_</span>
            </span>
          </h1>
        </div>
        <div className="tagline-container">
          <h2>
            I’m a Lead Developer at{" "}
            <a
              href="https://amadeus.com/en"
              className="amadeus-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Amadeus Labs
            </a>
            , building large-scale travel applications and the platforms behind them.
          </h2>
        </div>
        <div className="about-paragraph">
          <div className="about-content">
            {/* Left Column (50%) */}
            <div className="about-text-left">
              <p>
                My background spans travel, automotive, and consumer electronics, with experience
                across embedded systems and cloud-based platforms, covering the full software
                lifecycle - from design and development to deployment, operations, and evolution.
              </p>

              <p>
                I focus on solving complex technical and operational problems, designing systems
                that scale well, remain stable, and can evolve cleanly as requirements and
                constraints change. {' '}
                <a
                  href="/assets/naveenkhn_resume.pdf"
                  className="resume-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume ↓
                </a>
              </p>
            </div>
            {/* Right Column (50%) */}
            <div className="about-text-right">
              <div
                ref={photoRef}
                className={`profile-pic-container ${photoTouchActive ? 'touch-active' : ''}`}
                onClick={togglePhotoTouchActive}
                onTouchEnd={togglePhotoTouchActive}
              >
                <div className="profile-pic-bg"></div>
                <img 
                  className="profile-pic" 
                  src="https://github.com/naveenkhn.png?size=250" 
                  alt="Naveen's Profile" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;

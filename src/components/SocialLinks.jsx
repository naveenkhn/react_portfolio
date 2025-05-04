// components/SocialLinks.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <div className="social-links-about">
      <a
        href="https://github.com/naveenkhn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/naveenkhn/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://www.instagram.com/_n.a.v.e_e.n_/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
    </div>
  );
};

export default SocialLinks;
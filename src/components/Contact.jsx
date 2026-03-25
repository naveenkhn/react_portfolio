import React from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="contact"
      className="contact-section"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: 1.0 }}
    >
      <div className="contact-content">
        <div className="contact-title">
          <h2>Contact</h2>
        </div>

        <p className="contact-description">
          I’m currently looking for new opportunities. Whether you have a opening
          or want to add me to your network, I’ll try my best to get back to you!
        </p>

        <div className="contact-actions">
          <a
            href="https://github.com/naveenkhn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="contact-social-link"
          >
            <FaGithub />
          </a>
          <a href="mailto:naveenkmrhn@gmail.com" className="contact-email-button">
            Say Hello
          </a>
          <a
            href="https://www.linkedin.com/in/naveenkhn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="contact-social-link"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;

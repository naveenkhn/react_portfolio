import React from "react";
import "./Contact.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
          <h2>Get In Touch</h2>
        </div>

        <p className="contact-description">
          I’m currently looking for new opportunities. Whether you have a opening
          or want to add me to your network, I’ll try my best to get back to you!
        </p>

        <a href="mailto:naveenkmrhn@gmail.com" className="contact-email-button">
          Say Hello
        </a>
      </div>
    </motion.section>
  );
};

export default Contact;
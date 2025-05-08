import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-content">
        <div className="contact-title">
          <h2>Get In Touch</h2>
        </div>

        <p className="contact-description">
          I’m currently looking for new opportunities. Whether you have a question
          or just want to say hi, I’ll try my best to get back to you!
        </p>

        <a href="mailto:naveenkmrhn@gmail.com" className="contact-email-button">
          Say Hello
        </a>
      </div>
    </section>
  );
};

export default Contact;
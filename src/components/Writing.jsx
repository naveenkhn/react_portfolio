import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Writing.css';

const Writing = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.12,
  });

  return (
    <motion.section
      id="writing"
      className="writing-section"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <div className="writing-content">
        <h2 className="writing-title">Blog</h2>

        <div className="writing-card">
          <div className="writing-copy">
            <p className="writing-eyebrow">technical blog</p>
            <h3 className="writing-heading">Ideas, experiments, and engineering notes.</h3>
            <p className="writing-description">
              I share practical software engineering notes, experiments, and
              interesting ideas from what I build and learn.
            </p>

            <a
              className="writing-link"
              href="https://blog.naveenkhn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Blog →
            </a>
          </div>

          <div className="writing-preview-shell">
            <a
              className="writing-preview-link"
              href="https://blog.naveenkhn.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open technical blog preview"
            >
              <img
                className="writing-preview-image"
                src="/assets/blog_preview.png"
                alt="Preview of Naveen's technical blog"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Writing;

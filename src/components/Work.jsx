import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Work.css';

const Work = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.12,
  });

  return (
    <motion.section
      id="work"
      className="work-section"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="work-content">
        <h2 className="work-title">
          <span className="work-number">04.</span> Work
        </h2>

        <div className="work-card">
          <div className="work-card-header">
            <h3>GitHub Activity</h3>
          </div>

          <div className="work-snake-wrap">
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="https://raw.githubusercontent.com/naveenkhn/naveenkhn/output/github-contribution-grid-snake-dark.svg"
              />
              <source
                media="(prefers-color-scheme: light)"
                srcSet="https://raw.githubusercontent.com/naveenkhn/naveenkhn/output/github-contribution-grid-snake.svg"
              />
              <img
                className="work-snake-image"
                src="https://raw.githubusercontent.com/naveenkhn/naveenkhn/output/github-contribution-grid-snake.svg"
                alt="GitHub contribution snake"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;

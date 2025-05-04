import React, { useState } from 'react';
import './Experience.css';

const companies = [
  {
    name: 'Amadeus Labs',
    role: 'Software Engineer II',
    period: 'Sep 2018 - Present',
    url: 'https://amadeus.com/en',
    points: [
        'Developing high-availability travel tech APIs and UI portals.',
        'Driving cloud adoption and CI/CD best practices across teams.',
    ],
  },
  {
    name: 'Harman',
    role: 'Lead Developer',
    period: 'Dec 2015 - Aug 2018',
    url: 'https://www.harman.com/',
    points: [
      'Led the migration of legacy systems to microservices.',
      'Mentored junior developers and conducted code reviews.',
    ],
  },
  {
    name: 'Robert Bosch',
    role: 'Senior Engineer',
    period: 'Oct 2013 - Nov 2015',
    url: 'https://www.bosch-softwaretechnologies.com/en/',
    points: [
      'Contributed to embedded software development in automotive systems.',
      'Implemented software enhancements in diagnostics and ECU handling.',
    ],
  },  
  {
    name: 'HCL',
    role: 'Software Engineer',
    period: 'July 2011 - Sep 2013',
    url: 'https://www.hcltech.com/',
    points: [
      'Worked on enterprise-level web applications using Java and Spring Boot.',
      'Collaborated with cross-functional teams to deliver product features.',
    ],
  },
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(companies.length - 1); // Default to latest company

  return (
    <section className="experience-section" id="experience">
      <div className="experience-content">
        <h2 className="experience-title">
          <span className="experience-number">02.</span> Where I’ve Worked
        </h2>

        <div className="experience-container">
          <div className="experience-tabs">
            {companies.map((company, index) => (
              <button
                key={index}
                className={`experience-tab ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {company.name}
              </button>
            ))}
          </div>

          <div className="experience-details">
            <h3 className="experience-role">
              {companies[activeIndex].role} @{' '}
              <a
                href={companies[activeIndex].url}
                className="company-name"
                target="_blank"
                rel="noopener noreferrer"
              >
                {companies[activeIndex].name}
              </a>
            </h3>
            <p className="experience-period">{companies[activeIndex].period}</p>
            <ul className="experience-points">
              {companies[activeIndex].points.map((point, i) => (
                <li key={i}>
                  <span className="experience-arrow">▹</span> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
import React, { useState } from 'react';
import './Experience.css';

const companies = [
  {
    name: 'Amadeus Labs',
    role: 'Lead Developer',
    period: 'Sep 2018 - Present',
    url: 'https://amadeus.com/en',
    tech: 'Azure, Openshift, Kubernetes, GitOps, ArgoCD, Oracle, Splunk, Grafana, C++, Java | Linux Platform',
    points: [
      'Redesigned and modularized the application to reduce development complexity, decouple dependencies, and simplify deployment.',
      'Identified risks, gaps, uncertainties, and dependencies; formulated and executed mitigation strategies for critical deliveries.',
      'Led migration of the application stack—including services and databases—to the cloud.',
      'Implemented cloud-based authentication and authorization solutions, ensuring secure access control.',
      'Analyze cost trends and forecast usage, continuously applying optimization measures to reduce cloud spend and improve efficiency.',
      'Manage auto-scaling policies, maintain real-time alerting mechanisms, and actively monitor system health and performance.',
      'Automated routine operations using Jenkins, Python, Azure DevOps, and ArgoCD.',
      'Designed and implemented solutions with a strong focus on performance, stability, scalability, adaptability, user-friendliness, and practicality.',
    ],
  },
  {
    name: 'Harman',
    role: 'Senior Developer',
    period: 'Dec 2015 - Aug 2018',
    url: 'https://www.harman.com/',
    tech: 'C++, Python, Qt, Google Test | QNX Platform',    
    points: [
        'Designed and developed key navigation features like favorites, previous destinations, GPX import/export, and real-time guidance.',
        'Optimized CPU usage of the navigation engine to improve overall infotainment system performance.',
        'Built an efficient rendering mechanism for large datasets like POIs to reduce latency and enhance user experience.',
        'Performed design and requirement reviews in collaboration with cross-functional teams.',
      ],
  },
  {
    name: 'Bosch',
    role: 'Senior Developer',
    period: 'Oct 2013 - Nov 2015',
    url: 'https://www.bosch-softwaretechnologies.com/en/',
    tech: 'C++, Python, Perl | Linux Platform',
    points: [
      'Designed and developed audio features for infotainment systems including source prioritization, volume/mute management, and sound mode switching.',
      'Implemented efficient algorithms to manage seamless transitions between multiple audio sources.',
      'Developed spatial and ambiance sound presets for enhanced in-car audio experience.',
      'Automated test scenarios using test adaptors and TML scripts to simulate HMI behavior and validate functionality.',
      'Wrote shell scripts to automate development and testing workflows, improving productivity.',
      'Participated in bug fixing, code reviews, and design validation.',
    ],
  },  
  {
    name: 'HCL',
    role: 'Software Developer',
    period: 'July 2011 - Sep 2013',
    url: 'https://www.hcltech.com/',
    tech: 'C++, Shell | Linux Platform',
    points: [
      'Developed core HMI features for Sony BRAVIA Smart TVs, including initial setup (language, country, channel tuning).',
      'Implemented remote control event handling across multiple TV applications to ensure consistent UX.',
      'Wrote shell scripts to automate build, deployment, and validation tasks in the development environment.',
      'Involved in bug fixing, sequence diagram design, and activity flow definition.',
    ],
  },
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default to latest company

  return (
    <section className="experience-section" id="experience">
      <div className="experience-content">
        <h2 className="experience-title">
          <span className="experience-number">02.</span> Experience
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
            <p className="experience-tech">{companies[activeIndex].tech}</p>
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
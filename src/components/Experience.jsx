import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './Experience.css';

const companies = [
  {
    name: 'Amadeus',
    role: 'Lead Developer',
    period: 'Sep 2018 - Present',
    url: 'https://amadeus.com/en',
    tech: 'Azure, Openshift, Kubernetes, GitOps, ArgoCD, Oracle, C++, Java, Splunk, Grafana | Linux Platform',
    image: '/assets/airport.png',
    project: 'Airline Reservation & Inventory Platform',
    projectUrl: 'https://amadeus.com/en/airlines/products/all',
    client: 'Air France, British Airways, Emirates, Singapore Airlines, Japan Airlines and 400+ airlines',
    summary: 'Seat Management is a core airline system that provides seatmap displays and seat allocation throughout the reservation and operational windows, applying complex business rules.',    
    points: [
      'Redesigned and modularized the application to reduce development complexity, decouple dependencies, and simplify deployment.',
      'Lead requirement assessments and help shape new features, ensuring gaps, risks, and dependencies are identified early.',
      'Migrated the application, database, and supporting services to the cloud.',
      'Implemented cloud-based authentication and authorization solutions to ensure secure access control.',
      'Track cost trends and forecast usage; identify and optimize cloud resources to improve efficiency.',
      'Manage auto-scaling policies and set up real-time alerting mechanisms to monitor system performance.',
      'Automate routine tasks using Jenkins, Python, Azure DevOps, and ArgoCD.',
      'Design and implement solutions with a strong focus on performance, stability, scalability, adaptability, user experience, and practical applicability.',
      'Propose and implement improvements for system stability, process efficiency, and security on an ongoing basis.',
    ],
  },
  {
    name: 'Harman',
    role: 'Senior Developer',
    period: 'Dec 2015 - Aug 2018',
    url: 'https://www.harman.com/',
    tech: 'C++, Python, Qt, Google Test | QNX Platform',
    image: '/assets/Goldwing.jpg',
    project: 'Navigation system for Gold Wing superbike',
    projectUrl: 'https://powersports.honda.com/motorcycle/touring/gold-wing/features#technology',
    client: 'HONDA',
    summary: 'Developed features for an infotainment system offering navigation, phone integration, and multimedia for Honda’s flagship touring motorcycle.',     
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
    image: '/assets/car_infotainment.jpeg',
    project: 'Car Infotainment System',
    client: 'PEUGEOT',
    summary: 'Built audio features as part of a modular infotainment system that integrates entertainment, vehicle data, and connectivity.',    
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
    role: 'Developer',
    period: 'July 2011 - Sep 2013',
    url: 'https://www.hcltech.com/',
    tech: 'C++, Python | Linux Platform',
    image: '/assets/sony_bravia.jpg',
    project: 'BRAVIA SMART TV',
    projectUrl: 'https://www.sony.co.in/electronics/bravia/extra',
    client: 'SONY',
    summary: 'Worked on Human-Machine Interface (HMI) components for Sony BRAVIA Smart TVs, focusing on setup flows and remote control interactions.',    
    points: [
      'Developed core HMI features for Sony BRAVIA Smart TVs, including initial setup (language, country, channel tuning).',
      'Implemented remote control event handling across multiple TV applications to ensure consistent UX.',
      'Wrote shell scripts to automate build, deployment, and validation tasks in the development environment.',
      'Involved in bug fixing, sequence diagram design, and activity flow definition.',
    ],
  },
];

const SWIPE_THRESHOLD = 40;

function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const touchStateRef = useRef({ startX: null, handled: false });
  const activeCompany = companies[activeIndex];

  const metadataRows = [
    { key: 'role', label: 'Role', value: activeCompany.role, emphasized: true },
    { key: 'company', label: 'Company', value: activeCompany.name, href: activeCompany.url },
    { key: 'period', label: 'Tenure', value: activeCompany.period },
    { key: 'project', label: 'Product', value: activeCompany.project, href: activeCompany.projectUrl },
    { key: 'client', label: 'Client', value: activeCompany.client },
    { key: 'tech', label: 'Stack', value: activeCompany.tech, highlighted: true },
  ];

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + companies.length) % companies.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % companies.length);
  };

  const handleTouchStart = (event) => {
    touchStateRef.current = {
      startX: event.touches[0]?.clientX ?? null,
      handled: false,
    };
  };

  const handleTouchMove = (event) => {
    const { startX, handled } = touchStateRef.current;
    if (startX === null || handled) return;

    const currentX = event.touches[0]?.clientX ?? startX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX < 0) {
      goToNext();
    } else {
      goToPrevious();
    }

    touchStateRef.current.handled = true;
  };

  const handleTouchEnd = () => {
    touchStateRef.current = { startX: null, handled: false };
  };

  return (
    <motion.section
      className="experience-section"
      id="experience"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      <div className="experience-content">
        <div className="experience-title-row">
          <h2 className="experience-title">Experience</h2>
        </div>
        <div className="experience-container">
          <div className="experience-tabs-row">
            <div className="experience-tabs">
              {companies.map((company, index) => (
                <button
                  key={company.name}
                  className={`experience-tab ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  {company.name}
                </button>
              ))}
            </div>
          </div>

          <div
            className="experience-details"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div className="experience-role-block">
              <div className="experience-info">
                <div className="experience-meta-list">
                  {metadataRows.map((row) => {
                    return (
                      <div
                        key={row.key}
                        className={`experience-meta-row ${row.highlighted ? 'experience-meta-row-highlighted' : ''} ${row.emphasized ? 'experience-meta-row-emphasized' : ''}`}
                      >
                        <span className="experience-meta-label">{row.label}</span>
                        <span className="experience-meta-value">
                          {row.value}
                          {row.href ? (
                            <a
                              href={row.href}
                              className="experience-meta-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${row.value}`}
                            >
                              ↗
                            </a>
                          ) : null}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="experience-product-image">
                <img
                  src={`${activeCompany.image}`}
                  alt={`${activeCompany.name} product`}
                />
              </div>
            </div>
            <ul className="experience-points">
              {activeCompany.points.map((point, index) => (
                <li key={index}>
                  <span className="experience-bullet">◇</span> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Experience;

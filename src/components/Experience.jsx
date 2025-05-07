import React, { useState } from 'react';
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
    project: 'Integrated Navigation System',
    client: 'Honda Gold Wing 1833cc Super Bike',
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
    role: 'Software Developer',
    period: 'July 2011 - Sep 2013',
    url: 'https://www.hcltech.com/',
    tech: 'C++, Shell | Linux Platform',
    image: '/assets/sony_bravia.jpg',
    project: 'BRAVIA SMART TV',
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

function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

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
                key={company.name}
                className={`experience-tab ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {company.name}
              </button>
            ))}
          </div>

          <div className="experience-details">
            <div className="experience-role-block">
              <div className="experience-info">
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
                <div className="experience-period">{companies[activeIndex].period}</div>
                <div className="experience-project">{companies[activeIndex].project}</div>
                <div className="experience-client">{companies[activeIndex].client}</div>
              </div>

              <div className="experience-product-image">
                <img
                  src={`${companies[activeIndex].image}`}
                  alt={`${companies[activeIndex].name} product`}
                />
              </div>
            </div>
            <div className="experience-tech">{companies[activeIndex].tech}</div>
            <ul className="experience-points">
              {companies[activeIndex].points.map((point, index) => (
                <li key={index}>
                  <span className="experience-arrow">▹</span> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
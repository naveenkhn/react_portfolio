// App.jsx
import './App.css';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function App() {
  const [showHeader, setShowHeader] = useState(true);

  // Optional: hide header on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShowHeader(true);
      } else if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      {/* Header: home button at left, nav links at right */}
      <header className={`header ${showHeader ? '' : 'hidden'}`}>
        <a href="#home" className="home-button diamond">
          <span className="diamond-text">NK</span>
        </a>
        <nav className="nav-links">
          <a href="#home" className="nav-item"><span>01.</span> About</a>
          <a href="#skills" className="nav-item"><span>02.</span> Skills</a>
          <a href="#experience" className="nav-item"><span>03.</span> Experience</a>
          <a href="#work" className="nav-item"><span>04.</span> Work</a>
          <a href="#contact" className="nav-item"><span>05.</span> Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* About Section */}
        <section id="home" className="about-section">
          <div className="section-content">
            <div className="greeting-container">
              <h1>
                <span className="greeting-text">Hello, I'm </span>
                <span className="name-text">Naveen.</span>
              </h1>
            </div>
            <div className="tagline-container">
              <h2>I design and build scalable, reliable and resilient applications.</h2>
            </div>
            <div className="about-paragraph">
              <div className="about-content">
                {/* Left Column (50%) */}
                <div className="about-text-left">
                  <p>
                    I am working as a lead engineer at{" "}
                    <a
                      href="https://amadeus.com/en"
                      className="amadeus-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Amadeus
                    </a>{" "}
                    with expertise in travel, automotive, and consumer electronics domains.
                    I specialize in designing and developing high-performance, scalable,
                    and cost-effective software solutions. By focusing on right
                    architecture and efficient tools, I ensure consistency and reliability.
                    With a strong understanding of modern CI/CD pipelines and the SAFe
                    methodology, I utilize a broad knowledge of tech stacks and cloud
                    services to deliver scalable, resilient applications.
                  </p>
                  <div className="social-and-resume">
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
                        href="https://www.linkedin.com/in/naveen-k-31a46243/"
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
                    <a
                      href="/resume.pdf"
                      className="resume-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resume
                    </a>
                  </div>
                </div>
                {/* Right Column (50%) */}
                <div className="about-text-right">
                  <div className="profile-pic-container">
                    <div className="profile-pic-bg"></div>
                    <img 
                      className="profile-pic" 
                      src="https://github.com/naveenkhn.png?size=250" 
                      alt="Naveen's Profile" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Designed and developed by Naveen</p>
        <p>Inspired by Brittany Chiang</p>
      </footer>
    </div>
  );
}
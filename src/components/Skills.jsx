"use client";
import React, { useRef, useEffect, useState } from "react";
import './Skills.css';
import { motion, useScroll, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGithub } from "react-icons/fa";
import { 
  SiFlask, 
  SiDjango, 
  SiCplusplus, 
  SiJavascript, 
  SiGo, 
  SiMysql, 
  SiMongodb, 
  SiKubernetes, 
  SiJenkins,
  SiOracle,
  SiElasticsearch, 
  SiKibana, 
  SiGrafana, 
  SiBitbucket,
  SiRedhatopenshift,
  SiSplunk,
  SiGit
} from "react-icons/si";
import { DiJava, DiGit } from "react-icons/di";
import { useInView } from "react-intersection-observer";

// Your skills data
const skillsData = {
  "Web Frameworks": [
    { name: "React", icon: <FaReact size={40} color="#61dafb" /> },
    { name: "NodeJS", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" alt="NodeJS" style={{ height: "60px", filter: "brightness(1.8)" }} /> },
    { name: "Flask", icon: <SiFlask size={40} color="#3BABC3" /> },
    { name: "Django", icon: <i className="devicon-django-plain colored" style={{ fontSize: "40px", filter: "brightness(3)" }}></i> },
  ],
  "Programming Languages": [
    { name: "C++", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" style={{ height: "50px" }} /> },
    { name: "Java", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" style={{ height: "50px" }} /> },
    { name: "Python", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" style={{ height: "50px" }} /> },
    { name: "JavaScript", icon: <SiJavascript size={40} color="#f0db4f" /> },
    { name: "Go", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" alt="Go" style={{ height: "50px" }} /> }
  ],
  "DevOps Tools": [
    { name: "Docker", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" style={{ height: "60px" }} /> },
    { name: "Kubernetes", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" alt="Kubernetes" style={{ height: "50px" }} /> },
    { name: "OpenShift", icon: <SiRedhatopenshift size={40} color="#EE0000" /> },
    { name: "Argo CD", icon: <i className="devicon-argocd-plain colored" style={{ fontSize: "50px" }}></i> },
    { name: "Git", icon: <SiGit size={40} color="#F05032" /> },
    { name: "GitHub", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" style={{ height: "50px", filter: "brightness(0)" }} /> },
    { name: "Bitbucket", icon: <SiBitbucket size={40} color="#205081" style={{ filter: "brightness(1.8)" }} /> },
    { name: "Jenkins", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" alt="Jenkins" style={{ height: "50px" }} /> }
  ],
  "Data Processing & Analytics": [
    { name: "Elasticsearch", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg" alt="Elasticsearch" style={{ height: "50px" }} /> },
    { name: "Logstash", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/logstash/logstash-original.svg" alt="Logstash" style={{ height: "50px" }} /> },
    { name: "Kibana", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kibana/kibana-original.svg" alt="Kibana" style={{ height: "50px" }} /> },
    { name: "Splunk", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/splunk/splunk-original-wordmark.svg" alt="Splunk" style={{ height: "80px", filter: "brightness(0)" }} /> },
    { name: "Grafana", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" alt="Grafana" style={{ height: "50px" }} /> }
  ],
  "Databases": [
    { name: "Oracle", icon: <SiOracle size={40} color="#F80000" /> },
    { name: "Azure Cosmos", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cosmosdb/cosmosdb-original.svg" alt="Azure Cosmos" style={{ height: "50px" }} /> },
    { name: "MySQL", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" style={{ height: "60px", filter: "brightness(1.8)" }} /> },
    { name: "MongoDB", icon: <SiMongodb size={40} color="#47A248" /> }
  ]
};

const skillsOrder = [
  "Web Frameworks",
  "Programming Languages",
  "DevOps Tools",
  "Data Processing & Analytics",
  "Databases"
];

// Use the original skillsOrder array directly for display
const displayedSkillsOrder = skillsOrder;

/**
 * useDynamicMask Hook:
 * Dynamically updates the maskImage so that:
 *  - At extreme left: no blur on left
 *  - At extreme right: no blur on right
 *  - In between: blur on both sides
 */
function useDynamicMask(scrollXProgress) {
  const leftInset = "15%";
  const rightInset = "85%";
  const transparent = "#0000";
  const opaque = "#000";
  
  // Start with "in-between" blur
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
  );

  // Immediately set to extreme left state if scrollXProgress is 0
  if (scrollXProgress.get() === 0) {
    maskImage.set(`linear-gradient(90deg, ${opaque}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`);
  }
  
  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      // Extreme left => no blur on left side
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      // Extreme right => no blur on right side
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} 100%)`
      );
    } else {
      // In between => blur on both sides
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}

const Skills = () => {
  // Ref for the horizontally scrollable container
  const containerRef = useRef(null);
  const tileRefs = useRef([]);

  // We track the horizontal scroll progress of containerRef
  const { scrollXProgress } = useScroll({ container: containerRef });
  const maskImage = useDynamicMask(scrollXProgress);

  const { ref, inView } = useInView({ triggerOnce: true });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Clone the skillsOrder array to create a repeated array for seamless infinite scroll
  const repeatedSkillsOrder = [...skillsOrder, ...skillsOrder, ...skillsOrder];

  // Updated interval logic using useRef for intervalRef and scrollInterval
  const scrollInterval = 2000;
  const intervalRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || tileRefs.current.length === 0) return;

    let index = skillsOrder.length; // start in middle set
    const tileCount = repeatedSkillsOrder.length;

    const scrollToIndex = (i, behavior = "smooth") => {
      const tile = tileRefs.current[i];
      if (!tile) return;
      const isMobile = window.innerWidth <= 600;
      const offset = isMobile
        ? tile.offsetLeft
        : tile.offsetLeft - (container.offsetWidth - tile.offsetWidth) / 2;
      container.scrollTo({ left: offset, behavior });
    };

    scrollToIndex(index, "auto");
    setCurrentIndex(index);

    const handleMouseEnter = () => clearInterval(intervalRef.current);

    const handleMouseLeave = () => {
      intervalRef.current = setInterval(() => {
        index++;
        scrollToIndex(index);

        if (index >= tileCount - skillsOrder.length) {
          index = skillsOrder.length;
          setTimeout(() => scrollToIndex(index, "auto"), scrollInterval);
        }

        setCurrentIndex(index);
      }, scrollInterval);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    intervalRef.current = setInterval(() => {
      index++;
      scrollToIndex(index);

      if (index >= tileCount - skillsOrder.length) {
        index = skillsOrder.length;
        setTimeout(() => scrollToIndex(index, "auto"), scrollInterval);
      }

      setCurrentIndex(index);
    }, scrollInterval);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.section
      id="skills"
      className="skills-section"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      <div className="skills-content">
        <h2 className="skills-title">
          <span className="skills-number">03.</span> Skills
        </h2>

        <div className="skills-scroller-wrapper">
          <button
            className="scroll-btn left"
            onClick={() =>
              containerRef.current.scrollBy({ left: -300, behavior: "smooth" })
            }
          >
            ‹
          </button>

          <motion.div
            className="tiles-container"
            ref={containerRef}
            style={{ maskImage }}
            onWheel={e => {
              e.preventDefault();
              containerRef.current.scrollLeft += e.deltaY;
            }}
          >
            {repeatedSkillsOrder.map((category, index) => (
              <div
                className="tile"
                key={`${category}-${index}`}
                ref={el => tileRefs.current[index] = el}
              >
                <h3 className="tile-title">{category}</h3>
                <div className="tile-icons">
                  {skillsData[category].map((skill) => (
                    <div className="tile-item" key={skill.name}>
                      <div className="skill-icon">{skill.icon}</div>
                      <div className="skill-name">
                        <span className={skill.name.length > 10 ? "marquee" : ""}>
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <button
            className="scroll-btn right"
            onClick={() =>
              containerRef.current.scrollBy({ left: 300, behavior: "smooth" })
            }
          >
            ›
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
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
  SiBitbucket 
} from "react-icons/si";
import { DiJava, DiGit } from "react-icons/di";
import { useInView } from "react-intersection-observer";

// Your skills data
const skillsData = {
  "Web Frameworks": [
    { name: "React", icon: <FaReact size={40} color="#61dafb" /> },
    { name: "NodeJS", icon: <FaNodeJs size={40} color="#3c873a" /> },
    { name: "Flask", icon: <SiFlask size={40} color="#000000" /> },
    { name: "Django", icon: <SiDjango size={40} color="#092e20" /> }
  ],
  "Programming Languages": [
    { name: "C++", icon: <SiCplusplus size={40} color="#00599C" /> },
    { name: "Java", icon: <DiJava size={40} color="#007396" /> },
    { name: "Python", icon: <FaPython size={40} color="#306998" /> },
    { name: "JavaScript", icon: <SiJavascript size={40} color="#f0db4f" /> },
    { name: "Go", icon: <SiGo size={40} color="#00ADD8" /> }
  ],
  "DevOps Tools": [
    { name: "Docker", icon: <FaDocker size={40} color="#2496ED" /> },
    { name: "Kubernetes", icon: <SiKubernetes size={40} color="#326ce5" /> },
    { name: "OpenShift", icon: <i className="devicon-openshift-plain colored" style={{ fontSize: "40px" }}></i> },
    { name: "Argo CD", icon: <img src="path-to-argocd-icon.svg" alt="Argo CD" style={{ width: 40, height: 40 }} /> },
    { name: "Git", icon: <DiGit size={40} color="#F05032" /> },
    { name: "GitHub", icon: <FaGithub size={40} color="#181717" /> },
    { name: "Bitbucket", icon: <SiBitbucket size={40} color="#205081" /> },
    { name: "Jenkins", icon: <SiJenkins size={40} color="#D24939" /> }
  ],
  "Data Processing & Analytics": [
    { name: "Elasticsearch", icon: <SiElasticsearch size={40} color="#005571" /> },
    { name: "Logstash", icon: <i className="devicon-logstash-plain colored" style={{ fontSize: "40px" }}></i> },
    { name: "Kibana", icon: <SiKibana size={40} color="#005571" /> },
    { name: "Splunk", icon: <i className="devicon-splunk-plain colored" style={{ fontSize: "40px" }}></i> },
    { name: "Grafana", icon: <SiGrafana size={40} color="#F46800" /> }
  ],
  "Databases": [
    { name: "Oracle", icon: <SiOracle size={40} color="#F80000" /> },
    { name: "Azure Cosmos", icon: <i className="devicon-azure-plain colored" style={{ fontSize: "40px" }}></i> },
    { name: "MySQL", icon: <SiMysql size={40} color="#4479A1" /> },
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

  const paddedSkillsOrder = [
    skillsOrder[skillsOrder.length - 1], // Last
    ...skillsOrder,
    skillsOrder[0] // First again
  ];

  // Updated interval logic using useRef for intervalRef and scrollInterval
  const scrollInterval = 4000;
  const intervalRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || tileRefs.current.length === 0) return;

    let index = 1;
    const tileCount = paddedSkillsOrder.length;

    const scrollToIndex = (i) => {
      const tile = tileRefs.current[i];
      if (!tile) return;
      const offset = tile.offsetLeft - (container.offsetWidth - tile.offsetWidth) / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    };

    scrollToIndex(index); // show 1st tile centered initially
    setCurrentIndex(index);

    intervalRef.current = setInterval(() => {
      index++;
      if (index === tileCount - 1) {
        index = 1;
      }
      scrollToIndex(index);
      setCurrentIndex(index);
    }, scrollInterval);

    return () => clearInterval(intervalRef.current);
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
            {paddedSkillsOrder.map((category, index) => (
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
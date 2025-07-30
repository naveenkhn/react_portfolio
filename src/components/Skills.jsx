"use client";
import React, { useEffect, useState } from "react";
import './Skills.css';
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { 
  SiFlask, 
  SiDjango, 
  SiJavascript, 
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

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 360 / skillsOrder.length;
      if (document.querySelector(".skills-carousel")) {
        document.querySelector(".skills-carousel").style.transform = `rotateY(-${angle}deg)`;
      }
    }, 2500);
    return () => clearInterval(interval);
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

        <div className="skills-carousel-wrapper">
          <div className="skills-carousel">
            {skillsOrder.map((category, index) => {
              const angle = (360 / skillsOrder.length) * index;
              return (
                <div
                  className="tile"
                  key={category}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(320px)`,
                    width: "352px",
                    height: "352px"
                  }}
                >
                  <h3 className="tile-title">{category}</h3>
                  <div
                    className="tile-icons"
                  >
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
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
import React, { useEffect, useRef } from "react";
import './Loading.css';
import gsap from "gsap";

const Loading = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const outlineGroupRef = useRef(null);
  const outlineRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Set up diamond with only the tip visible
    gsap.set(outlineGroupRef.current, {
      scale: 1,
      transformOrigin: "50% 50%" // use center now, no scaling trick
    });

    gsap.set(outlineRef.current, {
      strokeDasharray: 300,
      strokeDashoffset: 299.4, // just the first tip visible
      opacity: 1
    });

    gsap.set(textRef.current, { opacity: 0 });

    const tl = gsap.timeline({ onComplete });

    // Stage 0: Hold the visible tip for 0.6s
    tl.to(outlineRef.current, {
      strokeDashoffset: "+=0",
      duration: 0.5
    });

    // Stage 1: Draw the rest of the outline
    tl.to(outlineRef.current, {
      strokeDashoffset: 0,
      duration: 2.0,
      ease: "power1.inOut"
    });

    // Stage 2: Fade in "N"
    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut"
    }, "-=0.3");

    // Stage 3: Rotate to square
    tl.to(outlineGroupRef.current, {
      rotation: 45,
      duration: 0.8,
      ease: "power1.inOut"
    });

    // Stage 4: Pause
    tl.to({}, { duration: 0.4 });

    // Stage 5: Rotate back to diamond
    tl.to(outlineGroupRef.current, {
      rotation: 0,
      duration: 1.0,
      ease: "power1.inOut"
    });

    // Stage 6: Fade out overlay
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut"
    });
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="loading-overlay">
      <svg className="loading-logo" viewBox="0 0 100 100">
        <g ref={outlineGroupRef}>
          <path
            ref={outlineRef}
            d="M50 10 L10 50 L50 90 L90 50 Z"
            className="logo-outline"
          />
        </g>
        <text
          ref={textRef}
          x="50"
          y="60"
          textAnchor="middle"
          className="logo-text"
        >
          N
        </text>
      </svg>
    </div>
  );
};

export default Loading;
import React, { useEffect, useRef } from "react";
import './Loading.css';
import gsap from "gsap";

const Loading = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const outlineGroupRef = useRef(null);
  const outlineRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Set initial state: outline group rotated 45°, so it appears as a diamond.
    gsap.set(outlineGroupRef.current, { rotation: 0, transformOrigin: "50% 50%" });

    // Ensure text is hidden initially.
    gsap.set(textRef.current, { opacity: 0, transform: "none" });

    // Set the strokeDashoffset to full length.
    gsap.set(outlineRef.current, { strokeDashoffset: 300 });

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Stage 1: Draw the diamond outline.
    tl.to(outlineRef.current, {
      strokeDashoffset: 0,
      duration: 2.0,
      ease: "power1.inOut"
    });

    // Stage 2: Fade in the letter "N".
    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut"
    }, "-=0.3");

    // Stage 3: Rotate outline group clockwise from diamond to square.
    // That is, from 0° to 45°.
    tl.to(outlineGroupRef.current, {
      rotation: 45,
      duration: 0.8,
      ease: "power1.inOut"
    });

    // Pause briefly after Stage 3
    tl.to({}, { duration: 0.4 });

    // Stage 4: Rotate outline group anticlockwise back to diamond (45° to 0°).
    tl.to(outlineGroupRef.current, {
      rotation: 0,
      duration: 1.0,
      ease: "power1.inOut"
    });

    // Stage 5: Fade out the overlay.
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut"
    });

  }, [onComplete]);

  return (
    <div ref={overlayRef} className="loading-overlay">
      <svg className="loading-logo" viewBox="0 0 100 100">
        {/* Outline group: rotates independently */}
        <g ref={outlineGroupRef}>
          <path
            ref={outlineRef}
            d="M50 10 L10 50 L50 90 L90 50 Z"
            className="logo-outline"
          />
        </g>
        {/* Text "N": remains outside the rotating group so it stays fixed */}
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
import React, { useEffect, useRef } from "react";
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
    // That is, from 45° to 0°.
    tl.to(outlineGroupRef.current, {
      rotation: 45,
      duration: 0.8,
      ease: "power1.inOut"
    });

    // Stage 4: Rotate outline group anticlockwise from square back to diamond.
    // That is, from 0° back to 45°.
    tl.to(outlineGroupRef.current, {
      rotation: 0,
      duration: 1.0,
      ease: "power1.inOut"
    });

    // Stage 5: Translate the entire overlay to header home button position.
    // Adjust x and y values as needed.
    tl.to(overlayRef.current, {
      x: -700,
      y: -350,
      duration: 0.8,
      ease: "power1.inOut"
    });

    // Stage 6: Fade out the overlay.
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
            // Reverse the path points for anti-clockwise drawing:
            d="M50 10 L10 50 L50 90 L90 50 Z"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="5"
            strokeDasharray="300"
            strokeLinecap="round"  // This should smooth out the gap          
          />
        </g>
        {/* Text "N": remains outside the rotating group so it stays fixed */}
        <text
          ref={textRef}
          x="50"
          y="57"
          textAnchor="middle"
          fill="var(--primary)"
          style={{ transform: "none", fontSize: "24px" }}
        >
          N
        </text>
      </svg>
    </div>
  );
};

export default Loading;
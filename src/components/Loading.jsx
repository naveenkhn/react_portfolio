import React, { useEffect, useRef } from "react";
import './Loading.css';
import gsap from "gsap";

const Loading = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const outlineGroupRef = useRef(null);
  const outlineRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      onComplete();
    };

    const ctx = gsap.context(() => {
      gsap.set(outlineGroupRef.current, {
        scale: 1,
        rotation: 0,
        transformOrigin: "50% 50%"
      });

      gsap.set(outlineRef.current, {
        strokeDasharray: 300,
        strokeDashoffset: 299.4,
        opacity: 1
      });

      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 1 });

      if (prefersReducedMotion) {
        gsap.timeline({ onComplete: finish })
          .set(outlineRef.current, { strokeDashoffset: 0 })
          .set(textRef.current, { opacity: 1 })
          .to(overlayRef.current, {
            opacity: 0,
            duration: 0.18,
            ease: "power1.out"
          });
        return;
      }

      gsap.timeline({ onComplete: finish })
        .to(outlineRef.current, {
          strokeDashoffset: "+=0",
          duration: 0.18
        })
        .to(outlineRef.current, {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: "power1.inOut"
        })
        .to(textRef.current, {
          opacity: 1,
          duration: 0.28,
          ease: "power1.out"
        }, "-=0.18")
        .to(outlineGroupRef.current, {
          rotation: 45,
          duration: 0.4,
          ease: "power1.inOut"
        })
        .to(outlineGroupRef.current, {
          rotation: 0,
          duration: 0.48,
          ease: "power1.inOut"
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.28,
          ease: "power1.out"
        }, "-=0.08");
    }, overlayRef);

    return () => {
      ctx.revert();
    };
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

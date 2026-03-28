import React, { useEffect, useRef } from "react";
import './Loading.css';
import gsap from "gsap";

const Loading = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const outlineGroupRef = useRef(null);
  const outlineRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const progressTextRef = useRef(null);
  const progressFillRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      onComplete();
    };

    const ctx = gsap.context(() => {
      const outlineLength = outlineRef.current?.getTotalLength?.() ?? 300;

      gsap.set(outlineGroupRef.current, {
        scale: 1,
        rotation: 0,
        transformOrigin: "50% 50%"
      });

      gsap.set(outlineRef.current, {
        strokeDasharray: outlineLength,
        strokeDashoffset: outlineLength - 0.6,
        opacity: 1
      });

      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(cursorRef.current, { opacity: 0 });
      gsap.set(progressTextRef.current, { textContent: '0%' });
      gsap.set(progressFillRef.current, {
        scaleX: 0,
        transformOrigin: '50% 50%'
      });
      gsap.set(overlayRef.current, { opacity: 1 });

      if (prefersReducedMotion) {
        gsap.timeline({ onComplete: finish })
          .set(outlineRef.current, { strokeDashoffset: 0 })
          .set(textRef.current, { opacity: 1 })
          .set(cursorRef.current, { opacity: 1 })
          .set(outlineGroupRef.current, { rotation: 45 })
          .set(progressTextRef.current, { textContent: '100%' })
          .set(progressFillRef.current, { scaleX: 1 })
          .to(overlayRef.current, {
            opacity: 0,
            duration: 0.18,
            ease: "power1.out"
          });
        return;
      }

      const progressState = { value: 0 };

      gsap.timeline({ onComplete: finish })
        .to(progressState, {
          value: 100,
          duration: 3.8,
          ease: "none",
          onUpdate: () => {
            if (progressTextRef.current) {
              progressTextRef.current.textContent = `${Math.round(progressState.value)}%`;
            }
          }
        }, 0)
        .to(progressFillRef.current, {
          scaleX: 1,
          duration: 3.8,
          ease: "none"
        }, 0)
        .to(outlineRef.current, {
          strokeDashoffset: "+=0",
          duration: 0.08
        }, 0)
        .to(outlineRef.current, {
          strokeDashoffset: 0,
          duration: 1.05,
          ease: "power2.inOut"
        }, 0.08)
        .to(textRef.current, {
          opacity: 1,
          duration: 0.34,
          ease: "power2.out"
        }, 1.08)
        .to(outlineGroupRef.current, {
          rotation: 45,
          duration: 1.1,
          ease: "power3.inOut"
        }, 1.42)
        .to(cursorRef.current, {
          opacity: 1,
          duration: 0.22,
          ease: "power2.out"
        }, 2.62)
        .to(cursorRef.current, {
          opacity: 0.24,
          duration: 0.44,
          ease: "power1.inOut",
          repeat: 2,
          yoyo: true
        }, 2.9)
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.32,
          ease: "power2.out"
        }, 3.75);
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
          x="46"
          y="59"
          textAnchor="middle"
          className="logo-text"
        >
          N
        </text>
        <rect
          ref={cursorRef}
          x="54.5"
          y="63.5"
          width="13"
          height="2.8"
          rx="1.4"
          className="logo-cursor"
        />
      </svg>
      <div className="loading-progress" aria-hidden="true">
        <div ref={progressTextRef} className="loading-progress-text">0%</div>
        <div className="loading-progress-track">
          <div ref={progressFillRef} className="loading-progress-fill" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

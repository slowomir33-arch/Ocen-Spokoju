"use client";

import React, { useEffect, useRef, useState } from "react";

const IntroReveal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"title" | "reveal" | "done">("title");
  const [fadeOut, setFadeOut] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const params = new URLSearchParams(window.location.search);
    const forceIntro = params.get("intro") === "1";
    const skipIntro = params.get("intro") === "0";

    // Only show once per session
    const already = sessionStorage.getItem("introDone") === "1";
    
    if (skipIntro || (!forceIntro && already)) {
      // Mark body as ready immediately if skipping intro
      document.body.classList.add("intro-ready");
      document.body.classList.add("intro-complete");
      return;
    }

    // Show intro and mark body as ready
    setVisible(true);
    document.body.classList.add("intro-ready");

    if (prefersReduced) {
      // Fast fade
      timeouts.current.push(
        window.setTimeout(() => setPhase("reveal"), 300)
      );
      timeouts.current.push(
        window.setTimeout(() => {
          setPhase("done");
          setFadeOut(true);
          document.body.classList.add("intro-complete");
        }, 600)
      );
      timeouts.current.push(
        window.setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("introDone", "1");
        }, 1200)
      );
      return;
    }

    // Sequence: title fade-in (1200ms) + hold (400ms) => start reveal (1800ms) => fade out (600ms)
    timeouts.current.push(
      window.setTimeout(() => setPhase("reveal"), 1600)
    );
    timeouts.current.push(
      window.setTimeout(() => {
        setPhase("done");
        setFadeOut(true);
        document.body.classList.add("intro-complete");
      }, 3200)
    );
    timeouts.current.push(
      window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("introDone", "1");
      }, 3900)
    );

    return () => {
      timeouts.current.forEach((t) => window.clearTimeout(t));
      timeouts.current = [];
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-overlay fixed inset-0 z-[100] flex items-center justify-center select-none ${fadeOut ? "intro-overlay--fadeout" : ""}`}>
      {/* Base white layer fading out */}
      <div className={`intro-base absolute inset-0 ${phase !== "title" ? "intro-base--fade" : ""}`} />

      {/* Cloudy white layer with non-uniform reveal */}
      <div className={`intro-clouds absolute inset-0 ${phase === "reveal" ? "intro-clouds--reveal" : ""}`} />

      {/* Title on top */}
      <div className={`intro-title relative text-center px-6 ${phase === "title" ? "intro-title--in" : "intro-title--hold"}`}>
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold font-serif leading-none whitespace-nowrap">
          <span className="gradient-text drop-shadow-lg">Ocean Spokoju</span>
        </h1>
      </div>
    </div>
  );
};

export default IntroReveal;

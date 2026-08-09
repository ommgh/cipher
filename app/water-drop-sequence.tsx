"use client";

import { useEffect, useRef, useState } from "react";

export function WaterDropSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const warmupObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoadVideo(true);
        video.load();
        warmupObserver.disconnect();
      },
      { rootMargin: "900px 0px" },
    );

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      },
      { threshold: 0.28 },
    );

    warmupObserver.observe(section);
    playbackObserver.observe(section);

    return () => {
      warmupObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-animate
      className="relative min-h-[560px] overflow-hidden bg-[#030405] sm:min-h-[680px] lg:min-h-screen"
      aria-label="CYPHER bottle drop"
    >
      <div className="absolute inset-0 bg-[#050101]" />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={shouldLoadVideo ? "auto" : "none"}
        poster="/bottle-drop-new-poster.jpg"
        width={1280}
        height={720}
        onCanPlay={() => setIsReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/bottle-drop-new-640.mp4" type="video/mp4" media="(max-width: 639px)" />
        <source src="/bottle-drop-new-960.mp4" type="video/mp4" media="(max-width: 1279px)" />
        <source src="/bottle-drop-new-1280.webm" type="video/webm" media="(min-width: 1280px)" />
        <source src="/bottle-drop-new-1280.mp4" type="video/mp4" />
      </video>
      <div
        className={`absolute inset-0 bg-[url('/bottle-drop-new-poster.jpg')] bg-cover bg-center transition-opacity duration-500 ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_44%,rgba(3,4,5,0.22)_74%,#030405_100%),linear-gradient(180deg,#030405_0%,rgba(3,4,5,0)_18%,rgba(3,4,5,0)_78%,#030405_100%)]"
        aria-hidden="true"
      />
    </section>
  );
}

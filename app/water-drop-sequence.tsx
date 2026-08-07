"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sequenceFrames = [
  "/figma/water-drop-frame-07.png",
  "/figma/water-drop-frame-08.png",
  "/figma/water-drop-frame-09.png",
];

export function WaterDropSequence() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const frames = gsap.utils.toArray<HTMLElement>("[data-water-frame]");
      const finalBottle = sectionRef.current?.querySelector<HTMLElement>("[data-water-final]");
      const vignette = sectionRef.current?.querySelector<HTMLElement>("[data-water-vignette]");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (frames.length < 3 || !finalBottle || !vignette) {
        return;
      }

      if (reduceMotion) {
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set(frames[2], { autoAlpha: 1 });
        gsap.set(finalBottle, { autoAlpha: 1, yPercent: 0, scale: 1 });
        return;
      }

      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[0], { autoAlpha: 1 });
      gsap.set(finalBottle, {
        autoAlpha: 0,
        yPercent: 16,
        scale: 0.92,
        rotate: -4,
        transformOrigin: "50% 50%",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=340%",
          pin: "[data-water-stage]",
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(frames[0], { autoAlpha: 0, duration: 0.7, ease: "none" })
        .to(frames[1], { autoAlpha: 1, duration: 0.7, ease: "none" }, "<")
        .to(frames[1], { autoAlpha: 0, duration: 0.7, ease: "none" })
        .to(frames[2], { autoAlpha: 1, duration: 0.7, ease: "none" }, "<")
        .to(frames[2], { scale: 1.04, duration: 0.9, ease: "none" })
        .to(finalBottle, { autoAlpha: 0.82, yPercent: 0, scale: 1, rotate: 0, duration: 1.1, ease: "none" }, "<0.15")
        .to(vignette, { autoAlpha: 0.82, duration: 0.8, ease: "none" }, "<")
        .to({}, { duration: 0.55 });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative bg-[#030405]">
      <div data-water-stage className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#050101]" />
        {sequenceFrames.map((frame, index) => (
          <div key={frame} data-water-frame className="absolute inset-0 opacity-0">
            <Image
              src={frame}
              alt=""
              fill
              unoptimized
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}

        <div
          data-water-final
          className="absolute inset-x-0 bottom-[-14vh] top-[7vh] opacity-0 mix-blend-lighten"
          aria-hidden="true"
        >
          <Image
            src="/figma/water-signup-bottle.png"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-contain"
          />
        </div>

        <div
          data-water-vignette
          className="pointer-events-none absolute inset-0 opacity-55"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(148,0,22,0.22),transparent_38%),linear-gradient(180deg,#030405_0%,transparent_15%,transparent_78%,#030405_100%)]" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingAnimations({ children }: Readonly<{ children: ReactNode }>) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set("[data-animate]", { autoAlpha: 1, clearProps: "transform" });
        gsap.set("[data-brand-lit]", { autoAlpha: 0.95, xPercent: 0, scale: 1 });
        return;
      }

      gsap.from("[data-hero-logo]", {
        autoAlpha: 0,
        y: -18,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-hero-headline] > span", {
        autoAlpha: 0,
        yPercent: 72,
        duration: 1,
        ease: "power4.out",
        stagger: 0.09,
        delay: 0.12,
      });

      gsap.from("[data-hero-copy], [data-hero-cta]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.35,
      });

      gsap.from("[data-hero-bottle]", {
        autoAlpha: 0,
        yPercent: 18,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
        stagger: {
          each: 0.035,
          from: "center",
        },
        delay: 0.22,
      });

      gsap.to("[data-hero-bottle]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-section]",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((section) => {
        gsap.from(section, {
          autoAlpha: 0.35,
          y: 34,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "top 42%",
            scrub: 0.6,
          },
        });
      });

      gsap.to("[data-brand-lit]", {
        autoAlpha: 1,
        xPercent: 0,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-brand-logo]",
          start: "top 86%",
          end: "center 46%",
          scrub: 0.7,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-product-card]").forEach((card, index) => {
        gsap.set(card, {
          transformOrigin: "50% 100%",
          zIndex: 10 - index,
        });
      });

      gsap.from("[data-product-card]", {
        autoAlpha: 0,
        y: 150,
        scale: 0.9,
        rotateX: 9,
        duration: 1,
        ease: "power4.out",
        stagger: 0.16,
        scrollTrigger: {
          trigger: "[data-product-section]",
          start: "top 76%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope },
  );

  return (
    <main ref={scope} className="min-h-screen overflow-hidden bg-[#030405] text-white">
      {children}
    </main>
  );
}

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

      gsap.from("[data-hero-built]", {
        autoAlpha: 0,
        xPercent: -42,
        duration: 1.05,
        ease: "power4.out",
        delay: 0.12,
      });

      gsap.from("[data-hero-a]", {
        autoAlpha: 0,
        scale: 0.25,
        transformOrigin: "50% 50%",
        duration: 0.82,
        ease: "back.out(1.9)",
        delay: 0.26,
      });

      gsap.from("[data-hero-swiss]", {
        autoAlpha: 0,
        xPercent: 34,
        duration: 1.05,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from("[data-hero-copy], [data-hero-cta]", {
        autoAlpha: 0,
        y: 46,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.42,
      });

      gsap.from("[data-hero-bottle]", {
        autoAlpha: 0,
        y: -320,
        scale: 0.985,
        duration: 1.9,
        ease: "power3.out",
        stagger: {
          each: 0.07,
          from: "center",
        },
        delay: 0.08,
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

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "[data-brand-logo]",
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        })
        .set("[data-brand-lit]", { xPercent: 0, scale: 1 })
        .to("[data-brand-lit]", {
          autoAlpha: 0.18,
          duration: 0.06,
          ease: "none",
        })
        .to("[data-brand-lit]", {
          autoAlpha: 0.02,
          duration: 0.08,
          ease: "none",
        })
        .to("[data-brand-lit]", {
          autoAlpha: 0.45,
          duration: 0.07,
          ease: "none",
        })
        .to("[data-brand-lit]", {
          autoAlpha: 0.09,
          duration: 0.09,
          ease: "none",
        })
        .to("[data-brand-lit]", {
          autoAlpha: 0.88,
          filter:
            "drop-shadow(0 0 18px rgb(186 201 232 / 0.62)) drop-shadow(0 0 58px rgb(186 201 232 / 0.42))",
          duration: 0.9,
          ease: "power2.out",
        });

      gsap.to("[data-brand-logo]", {
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-brand-logo]",
          start: "top 88%",
          end: "bottom 34%",
          scrub: 0.8,
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

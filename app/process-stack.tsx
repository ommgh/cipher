"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const processCards = [
  {
    title: "Record the Formula",
    image: "/figma/process-record.png",
  },
  {
    title: "Recreate",
    image: "/figma/process-recreate.png",
  },
  {
    title: "Strip the Cost",
    image: "/figma/process-strip.png",
  },
];

export function ProcessStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-process-card]");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(cards, {
          autoAlpha: 1,
          rotate: 0,
          scale: 1,
          xPercent: -50,
          yPercent: -50,
        });
        return;
      }

      gsap.set(cards, {
        autoAlpha: 1,
        transformOrigin: "50% 50%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(cards[0], { y: 0, scale: 1, rotate: 0, zIndex: 30 });
      gsap.set(cards[1], { y: "115vh", scale: 0.96, rotate: -3, zIndex: 40 });
      gsap.set(cards[2], { y: "125vh", scale: 0.96, rotate: 4, zIndex: 50 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=260%",
          pin: "[data-process-stage]",
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(cards[0], { y: -34, scale: 0.94, rotate: -3, duration: 1, ease: "none" })
        .to(cards[1], { y: 24, scale: 1, rotate: 2, duration: 1, ease: "none" }, "<")
        .to({}, { duration: 0.25 })
        .to(cards[0], { y: -68, scale: 0.9, rotate: -5, duration: 1, ease: "none" })
        .to(cards[1], { y: -22, scale: 0.95, rotate: -2, duration: 1, ease: "none" }, "<")
        .to(cards[2], { y: 56, scale: 1, rotate: 3, duration: 1, ease: "none" }, "<")
        .to({}, { duration: 0.45 });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative bg-[#030405]">
      <div data-process-stage className="relative h-screen overflow-hidden px-4 sm:px-8 lg:px-15">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%)]" />

        <h2 className="pointer-events-none absolute left-0 top-[10%] z-10 text-[clamp(4.8rem,12vw,13rem)] font-medium uppercase leading-none text-[#8a8a8a]/70 sm:left-6 lg:left-0">
          Same Juice.
        </h2>
        <p className="pointer-events-none absolute bottom-[8%] right-0 z-10 text-right text-[clamp(4.8rem,12vw,13rem)] font-medium uppercase leading-none text-[#8a8a8a]/70 sm:right-6 lg:right-0">
          No Markup.
        </p>

        <div className="absolute inset-0 z-20">
          {processCards.map((card) => (
            <article
              key={card.title}
              data-process-card
              className="absolute left-1/2 top-1/2 aspect-[653/801] w-[min(78vw,28rem)] overflow-hidden shadow-[0_38px_90px_rgba(0,0,0,0.55)]"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 78vw, 28rem"
                className="object-cover"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

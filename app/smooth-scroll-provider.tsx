"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: Readonly<{ children: ReactNode }>) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    let frame = 0;
    let removeScrollListener: (() => void) | undefined;

    const syncScrollTrigger = () => {
      if (removeScrollListener) {
        return;
      }

      const lenis = lenisRef.current?.lenis;
      if (!lenis) {
        frame = requestAnimationFrame(syncScrollTrigger);
        return;
      }

      const updateScrollTrigger = () => ScrollTrigger.update();

      lenis.on("scroll", updateScrollTrigger);
      ScrollTrigger.refresh();

      removeScrollListener = () => {
        lenis.off("scroll", updateScrollTrigger);
      };
    };

    syncScrollTrigger();

    return () => {
      cancelAnimationFrame(frame);
      removeScrollListener?.();
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: true,
        anchors: {
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        },
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        touchMultiplier: 1,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";
import { LandingAnimations } from "./landing-animations";
import { ProductShowcase } from "./product-showcase";
import { ProcessStack } from "./process-stack";
import { WaterDropSequence } from "./water-drop-sequence";

const heroBottles = [
  { src: "/figma/hero-bottle-01.png", label: "Red Velvet", left: 0, top: 47.5, topOffset: 10, size: "small" },
  { src: "/figma/hero-bottle-02.png", label: "Ember", left: 9.6, top: 47.5, topOffset: 10, size: "small" },
  { src: "/figma/hero-bottle-03.png", label: "Dusk Blue", left: 14.4, top: 0, topOffset: 20, size: "small" },
  { src: "/figma/hero-bottle-04.png", label: "Open Road", left: 27.4, top: 0, topOffset: 20, size: "small" },
  { src: "/figma/hero-bottle-05.png", label: "Ocean Current", left: 40.5, top: 0, topOffset: 20, size: "small" },
  { src: "/figma/hero-bottle-06.png", label: "Violet Whisper", left: 53.6, top: 0, topOffset: 20, size: "small" },
  { src: "/figma/hero-bottle-07.png", label: "Code 14", left: 66.6, top: 0, topOffset: 20, size: "small" },
  { src: "/figma/hero-bottle-08.png", label: "Code 21", left: 71.2, top: 46.9, topOffset: 10, size: "small" },
  { src: "/figma/hero-bottle-09.png", label: "Code 08", left: 80.8, top: 46.9, topOffset: 10, size: "small" },
  { src: "/figma/hero-bottle-10.png", label: "Code 45", left: 21.6, top: 29.1, topOffset: 10, size: "large" },
  { src: "/figma/hero-bottle-11.png", label: "Code 19", left: 33, top: 29.1, topOffset: 10, size: "large" },
  { src: "/figma/hero-bottle-12.png", label: "Code 07", left: 44.3, top: 29.1, topOffset: 10, size: "large" },
  { src: "/figma/hero-bottle-13.png", label: "Code 12", left: 55.7, top: 29.1, topOffset: 10, size: "large" },
];

const footerGroups = [
  ["Shop", "All Fragrances", "Women", "Men", "Unisex", "Gift Cards"],
  ["Company", "About", "How We Decode", "Sustainability", "Reviews"],
  ["Help", "Contact", "Shipping", "Returns", "FAQs"],
];

function GlassButton({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <a
      href="#fragrances"
      className={`inline-flex h-[70px] items-center justify-center border border-[#a7a7a7] bg-white/10 px-9 text-sm font-medium uppercase text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 ${className}`}
    >
      {children}
    </a>
  );
}

function HeroBottleDisplay() {
  return (
    <div
      className="absolute left-1/2 top-[10rem] z-10 aspect-[927/393] w-[190vw] max-w-[58rem] -translate-x-1/2 sm:top-[11.5rem] sm:w-[min(118vw,58rem)] lg:top-[14.25rem]"
      aria-label="CYPHER fragrance bottle collection"
    >
      {heroBottles.map((bottle, index) => {
        const isLarge = bottle.size === "large";

        return (
          <button
            key={`${bottle.label}-${index}`}
            data-hero-bottle
            type="button"
            aria-label={`${bottle.label} bottle`}
            className="hero-bottle absolute cursor-pointer border-0 bg-transparent p-0 focus:outline-none"
            style={{
              left: `${bottle.left}%`,
              top: `calc(${bottle.top}% + ${bottle.topOffset}px)`,
              width: isLarge ? "22.7%" : "19.2%",
              height: isLarge ? "62.2%" : "52.6%",
              zIndex: Math.round(bottle.top) + (isLarge ? 10 : 0),
            }}
          >
            <span className="absolute bottom-[14%] left-1/2 h-[2.5%] w-[53%] -translate-x-1/2 rounded-full bg-black blur-[5px]" />
            <Image
              src={bottle.src}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 768px) 23vw, 210px"
              className="hero-bottle-image object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}

function BrandLogoTransition() {
  return (
    <div
      data-brand-logo
      className="brand-logo-transition pointer-events-none relative mx-auto aspect-[565/596] w-[min(118vw,51rem)] lg:absolute lg:left-[28%] lg:top-1/2 lg:z-0 lg:w-[55.5rem] lg:-translate-x-1/2 lg:-translate-y-1/2"
    >
      <Image
        src="/figma/brand-logo-base.svg"
        alt=""
        fill
        unoptimized
        sizes="(max-width: 768px) 72vw, 35rem"
        className="brand-logo-transition-rest object-contain"
      />
      <Image
        src="/figma/brand-logo-left.svg"
        alt="CYPHER brand mark"
        fill
        unoptimized
        sizes="(max-width: 768px) 72vw, 35rem"
        className="brand-logo-transition-lit object-contain"
        data-brand-lit
      />
    </div>
  );
}

export default function Home() {
  return (
    <LandingAnimations>
      <section
        data-hero-section
        className="relative flex min-h-[930px] flex-col items-center overflow-hidden px-4 pb-16 pt-8 text-center sm:px-8 lg:px-15"
      >
        <Image
          src="/figma/hero-bg.png"
          alt=""
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,5,0.05)_0%,rgba(3,4,5,0.15)_62%,#030405_100%)]" />
        <div data-hero-logo className="relative z-10 h-36 w-56 sm:h-44 sm:w-72">
          <Image src="/figma/logo.svg" alt="CYPHER" fill priority className="object-contain" />
        </div>
        <HeroBottleDisplay />
        <div className="relative z-10 mt-auto grid w-full max-w-[1320px] gap-8 text-left lg:absolute lg:bottom-[60px] lg:left-[60px] lg:right-[60px] lg:mt-0 lg:block lg:max-w-none">
          <div>
            <h1
              data-hero-headline
              className="flex max-w-6xl flex-col overflow-hidden text-[clamp(3.4rem,10vw,8.4rem)] leading-[0.9] lg:max-w-none lg:flex-row lg:items-start lg:text-[clamp(3.9rem,6vw,5.35rem)] lg:leading-none"
            >
              <span data-hero-built className="brand-headline whitespace-nowrap lg:-mt-3">
                Built Like
              </span>
              <span
                data-hero-a
                className="process-outline-text mt-1 lg:ml-12 lg:mt-[0.35em] xl:ml-16"
              >
                A
              </span>
              <span
                data-hero-swiss
                className="text-gradient-muted lg:ml-16 lg:mt-[0.62em] lg:whitespace-nowrap xl:ml-24"
              >
                SWISS FORMULA
              </span>
            </h1>
            <p data-hero-copy className="mt-8 max-w-md text-base leading-7 text-[#cacaca] sm:text-lg">
              Every fragrance is decoded note by note, recreated with precision, and priced for
              what&apos;s inside the bottle.
            </p>
          </div>
          <div data-hero-cta>
            <GlassButton className="w-full sm:w-auto lg:absolute lg:bottom-0 lg:right-[96px]">
              Shop All Fragrances
            </GlassButton>
          </div>
        </div>
      </section>

      <section
        data-animate
        id="story"
        className="relative overflow-hidden px-4 py-24 sm:px-8 lg:px-15 lg:py-40"
      >
        <Image
          src="/figma/story-bg.png"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#030405]/48 backdrop-blur-[2px]" />
        <div className="relative mx-auto min-h-[640px] max-w-[1320px] lg:flex lg:items-center">
          <BrandLogoTransition />
          <div className="relative z-10 mx-auto max-w-2xl text-center lg:ml-auto lg:mr-0 lg:text-left">
            <h2 className="max-w-3xl text-[clamp(2.9rem,5.8vw,4.9rem)] font-medium leading-[0.98] text-white">
              Luxury Isn&apos;t the Scent.
              <span className="mt-2 block font-light text-[#9a9a9a]">It&apos;s the Markup.</span>
            </h2>
            <div className="mt-10 grid gap-5 text-lg leading-8 text-[#bdbdbd] sm:text-xl lg:max-w-xl">
              <p>Most fragrance brands charge for celebrity campaigns, prestige packaging, and decades of brand equity.</p>
              <p className="text-white">We don&apos;t.</p>
              <p>We believe exceptional perfume should be defined by what&apos;s inside the bottle, not the logo on it.</p>
              <p className="text-[#9f9f9f]">
                Every <strong className="font-medium text-white">CYPHER</strong> fragrance is Swiss-crafted using
                premium-grade ingredients, giving you the experience of luxury without paying for the illusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase />

      <ProcessStack />

      <section
        data-animate
        className="relative overflow-hidden px-4 pb-24 pt-24 text-center sm:px-8 lg:px-15 lg:pb-36 lg:pt-48"
      >
        <div className="relative z-10 mx-auto max-w-[1320px]">
          <h2 className="mx-auto max-w-6xl text-[clamp(3.2rem,8vw,6.6rem)] leading-none">
            <span className="brand-headline block">New Formulas.</span>
            <span className="process-outline-text block text-right font-medium">FIRST ACCESS.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#cacaca]">
            Get early access to new fragrance codes, limited releases, and insider drops.
          </p>
          <form className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-[1fr_auto]">
            <label className="sr-only" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              className="h-[70px] bg-[#2d1b1b]/20 px-7 text-white outline-none ring-1 ring-white/10 placeholder:text-white/45 focus:ring-white/60"
            />
            <button
              type="submit"
              className="h-[70px] border border-[#a7a7a7] bg-white/10 px-12 text-sm font-medium uppercase text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              Join the List
            </button>
          </form>
        </div>
      </section>

      <WaterDropSequence />

      <footer data-animate className="px-4 pb-6 pt-10 sm:px-8 lg:px-15">
        <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,auto)] lg:gap-24">
          <div>
            <div className="relative h-28 w-44">
              <Image src="/figma/logo.svg" alt="CYPHER" fill className="object-contain object-left" />
            </div>
            <p className="mt-8 max-w-60 text-lg leading-8 text-[#dfdfdf]">
              Swiss-crafted. Decoded scents. Same juice. No markup.
            </p>
          </div>
          {footerGroups.map(([title, ...links]) => (
            <nav key={title} aria-label={title}>
              <h3 className="text-xl font-medium uppercase text-white">{title}</h3>
              <ul className="mt-7 space-y-4 text-lg text-[#dfdfdf]">
                {links.map((link) => (
                  <li key={link}>
                    <a className="transition hover:text-white" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h3 className="text-xl font-medium uppercase text-white">Follow Us</h3>
            <div className="mt-7 flex gap-5">
              {[1, 2, 3, 4].map((item) => (
                <a key={item} href="#" className="relative h-8 w-8 transition hover:opacity-70">
                  <Image src={`/figma/social-${item}.svg`} alt="" fill className="object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-20 text-center text-sm text-[#a3a3a3]">© 2026 CYPHER. All rights reserved</p>
        <div className="relative mx-auto mt-12 h-16 w-full opacity-100 sm:h-28 lg:h-[11vw] lg:min-h-36 lg:max-h-56">
          <Image src="/figma/WORDMARK.svg" alt="CYPHER" fill className="object-contain" />
        </div>
      </footer>
    </LandingAnimations>
  );
}

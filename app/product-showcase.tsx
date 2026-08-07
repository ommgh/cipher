"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const products = [
  {
    code: "19",
    name: "Dusk Blue",
    family: "Woody Aromatic",
    price: "$49",
    cardBackground: "/figma/product-card-bg-dusk.png",
    bottle: "/figma/product-bottle-dusk.png",
    glow: "bg-[#011226]",
    sectionGlow: "rgba(23, 91, 170, 0.22)",
    glowPosition: "28% 48%",
    backdropPosition: "lg:left-[28%]",
    offset: "lg:translate-y-0",
    details: [
      ["Family", "Woody Aromatic"],
      ["Top Notes", "Bergamot, Cardamom, Pink Pepper"],
      ["Heart Notes", "Lavender, Cedarwood, Violet Leaf"],
      ["Base Notes", "Sandalwood, Amber, Musk"],
      ["Inspired By", "Bleu de Chanel"],
      ["Retail Price", "$175"],
      ["Cipher Price", "$49"],
    ],
  },
  {
    code: "11",
    name: "Ocean Current",
    family: "Aquatic",
    price: "$49",
    cardBackground: "/figma/product-card-bg-ocean.png",
    bottle: "/figma/product-bottle-ocean.png",
    glow: "bg-[#001013]",
    sectionGlow: "rgba(0, 178, 158, 0.18)",
    glowPosition: "50% 50%",
    backdropPosition: "lg:left-1/2",
    offset: "lg:translate-y-10",
    details: [
      ["Family", "Aquatic"],
      ["Top Notes", "Bergamot, Galbanum, Pink Pepper"],
      ["Heart Notes", "Lavender, Galbanum, Cedarwood"],
      ["Base Notes", "Vetiver, Patchouli, Musk"],
      ["Inspired By", "Green Irish Tweed"],
      ["Retail Price", "$280"],
      ["Cipher Price", "$49"],
    ],
  },
  {
    code: "16",
    name: "Violet Whisper",
    family: "Sweet Floral",
    price: "$49",
    cardBackground: "/figma/product-card-bg-violet.png",
    bottle: "/figma/product-bottle-violet.png",
    glow: "bg-[#1f0011]",
    sectionGlow: "rgba(172, 44, 132, 0.2)",
    glowPosition: "72% 52%",
    backdropPosition: "lg:left-[72%]",
    offset: "lg:translate-y-20",
    details: [
      ["Family", "Sweet Floral"],
      ["Top Notes", "Pear, Pink Pepper, Mandarin"],
      ["Heart Notes", "Violet, Jasmine, Orange Blossom"],
      ["Base Notes", "Vanilla, Tonka Bean, Soft Musk"],
      ["Inspired By", "Libre"],
      ["Retail Price", "$165"],
      ["Cipher Price", "$49"],
    ],
  },
];

type Product = (typeof products)[number];

function ProductCard({
  product,
  onActivate,
  onDeactivate,
}: Readonly<{
  product: Product;
  onActivate: (product: Product) => void;
  onDeactivate: () => void;
}>) {
  return (
    <article
      data-product-card
      className="group relative flex min-h-[540px] flex-col justify-end overflow-hidden border border-[#5a5d5d] bg-[#02070d]"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onDeactivate();
        }
      }}
      onFocus={() => onActivate(product)}
      onMouseEnter={() => onActivate(product)}
      onMouseLeave={onDeactivate}
    >
      <Image
        src={product.cardBackground}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 408px"
        className="object-cover"
      />
      <div className={`absolute inset-x-[22%] bottom-[25%] h-20 rounded-full ${product.glow} opacity-90 blur-[70px]`} />
      <div className="absolute inset-x-[-16%] top-2 h-[420px] transition duration-700 group-hover:scale-[1.04] group-focus-within:scale-[1.04]">
        <Image
          src={product.bottle}
          alt={`${product.name} fragrance bottle`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-contain mix-blend-screen drop-shadow-[0_34px_58px_rgba(0,0,0,0.55)]"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-[#03040f]/80 opacity-0 backdrop-blur-[5px] transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />

      <div className="absolute inset-x-7 top-7 z-20 flex h-[calc(100%-3.5rem)] flex-col opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <dl className="grid gap-4 text-left text-white">
          {product.details.map(([label, value], index) => (
            <div
              key={label}
              className={index === 4 || index === 5 ? "border-t border-white/10 pt-4" : ""}
            >
              <dt className="text-[11px] font-medium uppercase tracking-wide text-[#979595]">
                {label}
              </dt>
              <dd className="mt-1.5 text-sm leading-5 text-white sm:text-[15px]">{value}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          className="mt-auto flex h-16 w-full items-center justify-center border border-[#a7a7a7] bg-white/10 px-8 text-sm font-medium uppercase text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
        >
          Add To Cart
        </button>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-6 p-7 transition duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
        <div>
          <p className="text-3xl font-medium uppercase leading-none text-white">{product.code}</p>
          <h3 className="mt-3 text-2xl uppercase leading-none text-white">{product.name}</h3>
          <p className="mt-4 text-sm text-[#aeaeae]">{product.family}</p>
        </div>
        <p className="text-3xl font-medium leading-none text-white">{product.price}</p>
      </div>
    </article>
  );
}

export function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [displayedProduct, setDisplayedProduct] = useState<Product | null>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  const activateProduct = (product: Product) => {
    setDisplayedProduct(product);
    setActiveProduct(product);
  };

  useEffect(() => {
    if (!bottleRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!activeProduct) {
      gsap.to(bottleRef.current, {
        autoAlpha: 0,
        y: -90,
        scale: 0.78,
        rotate: 15,
        duration: reduceMotion ? 0.01 : 0.35,
        ease: "power2.in",
        overwrite: true,
      });
      return;
    }

    gsap.fromTo(
      bottleRef.current,
      { autoAlpha: reduceMotion ? 0.28 : 0, y: reduceMotion ? 0 : 260, scale: 0.6, rotate: 15 },
      {
        autoAlpha: 0.3,
        y: 0,
        scale: 0.9,
        rotate: 15,
        duration: reduceMotion ? 0.01 : 0.75,
        ease: "power4.out",
        overwrite: true,
      },
    );
  }, [activeProduct]);

  return (
    <section
      data-animate
      data-product-section
      id="fragrances"
      className="relative overflow-hidden px-4 py-24 sm:px-8 lg:px-15 lg:py-36"
    >
      <Image
        src="/figma/products-bg.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030405] via-[#030405]/55 to-[#030405]" />

      <div
        className="pointer-events-none absolute inset-0 z-[1] transition duration-500"
        style={{
          background: activeProduct
            ? `radial-gradient(circle at ${activeProduct.glowPosition}, ${activeProduct.sectionGlow} 0%, rgba(3, 4, 5, 0.08) 34%, transparent 68%)`
            : "transparent",
          opacity: activeProduct ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <div
        ref={bottleRef}
        className={`pointer-events-none absolute left-1/2 top-[-5rem] z-30 aspect-[1920/1334] w-[min(129vw,62rem)] -translate-x-1/2 opacity-0 mix-blend-screen transition-[left] duration-500 sm:top-[-8rem] lg:top-[-9rem] ${
          activeProduct?.backdropPosition ?? displayedProduct?.backdropPosition ?? ""
        }`}
        aria-hidden="true"
      >
        {displayedProduct ? (
          <Image
            key={displayedProduct.bottle}
            src={displayedProduct.bottle}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 768px) 129vw, 62rem"
            className="object-contain"
          />
        ) : null}
      </div>

      <div className="relative z-20 mx-auto max-w-[1320px]">
        <div className="grid gap-8 md:grid-cols-3 lg:gap-5">
          {products.map((product) => (
            <div key={product.name} className={product.offset}>
              <ProductCard
                product={product}
                onActivate={activateProduct}
                onDeactivate={() => setActiveProduct(null)}
              />
            </div>
          ))}
        </div>
        <div className="mt-24 flex justify-center">
          <a
            href="#fragrances"
            className="inline-flex h-[70px] w-full items-center justify-center border border-[#a7a7a7] bg-white/10 px-9 text-sm font-medium uppercase text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 sm:w-auto"
          >
            View All Fragrances
          </a>
        </div>
      </div>
    </section>
  );
}

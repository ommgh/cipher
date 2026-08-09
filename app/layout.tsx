import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import "lenis/dist/lenis.css";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    {
      path: "../public/fonts/Neue Montreal/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Neue Montreal/NeueMontreal-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Neue Montreal/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Neue Montreal/NeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Neue Montreal/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Neue Montreal/NeueMontreal-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Neue Montreal/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Neue Montreal/NeueMontreal-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "CYPHER | Swiss-Crafted Fragrances",
  description:
    "CYPHER decodes premium fragrances with Swiss-crafted formulas, exceptional ingredients, and no luxury markup.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${neueMontreal.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

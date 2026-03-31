"use client";
import React from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  LazyMotion,
  domAnimation,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import { GlassShimmerButton } from "@/components/ui/GlassShimmerButton";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <LazyMotion features={domAnimation}>
        <m.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
        >
          <CarouselRow products={firstRow} direction="reverse" />
          <CarouselRow products={secondRow} direction="normal" />
          <CarouselRow products={thirdRow} direction="reverse" />
        </m.div>
      </LazyMotion>
    </div>
  );
};

function CarouselRow({
  products,
  direction,
}: {
  products: { title: string; link: string; thumbnail: string }[];
  direction: "normal" | "reverse";
}) {
  return (
    <div
      className={`flex gap-8 overflow-x-auto mb-20 touch-pan-x ${direction === "reverse" ? "flex-row-reverse" : "flex-row"}`}
      style={{ scrollbarWidth: "none" }}
    >
      {products.map((product) => (
        <ProductCard product={product} key={product.title} />
      ))}
    </div>
  );
}

export const Header = () => {
  return (
    <div className="max-w-7xl z-10 relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl pointer-events-none md:text-6xl text-balance capitalize font-bold dark:text-white">
        Unlimited Growth with subscription-based lead generation
      </h1>
      <p className="max-w-2xl text-base pointer-events-none md:text-xl mt-8 mb-lg dark:text-neutral-200">
        From SMART ads and campaign management to message marketing, Lead Flow
        provides everything you need.
      </p>
      <Link href="#booking-widget" className="inline-block">
        <GlassShimmerButton variant="secondary" size="md">
          Book Discovery Call
        </GlassShimmerButton>
      </Link>
    </div>
  );
};

export const ProductCard = ({
  product,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
}) => {
  return (
    <m.div
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl w-full h-full"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black transition-opacity pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </m.div>
  );
};

"use client";
import React from "react";
import {
  motion as m,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";

export const SimpleScrollTest = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Simple horizontal movement - no springs, no complex transforms
  const translateX = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div
      ref={ref}
      className="h-[200vh] py-20 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-20">
          Simple Scroll Test
        </h2>
        
        {/* First row - moves left */}
        <m.div 
          style={{ x: translateX }}
          className="flex space-x-8 mb-20"
        >
          {products.slice(0, 3).map((product) => (
            <SimpleCard key={product.title} product={product} />
          ))}
        </m.div>
        
        {/* Second row - moves right */}
        <m.div 
          style={{ x: translateXReverse }}
          className="flex space-x-8"
        >
          {products.slice(3, 6).map((product) => (
            <SimpleCard key={product.title} product={product} />
          ))}
        </m.div>
      </div>
    </div>
  );
};

const SimpleCard = ({
  product,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
}) => {
  return (
    <div className="min-w-[300px] h-64 relative bg-gray-100 rounded-lg overflow-hidden">
      <Link href={product.link} className="block w-full h-full">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h3 className="font-medium">{product.title}</h3>
        </div>
      </Link>
    </div>
  );
};

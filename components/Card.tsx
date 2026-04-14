"use client";

import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image?: string;
  price?: string;
};

export default function Card({ title, description, image, price }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl group h-60 cursor-pointer shadow-sm hover:shadow-xl transition">

      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-0 p-5 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-white/80">
          {description}
        </p>
        <p className="text-sm text-white/80">
          {price}
        </p>
      </div>
    </div>
  );
}
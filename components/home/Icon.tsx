import Image from "next/image";

export default function Icon({ src, alt = "" }: { src: string; alt?: string }) {
  return <Image src={src} alt={alt} width={20} height={20} aria-hidden={!alt} />;
}

import Image from "next/image";

export default function Hero() {
  return (
    <div className="hero min-h-[50vh] lg:min-h-[80vh] relative bg-[#D9C7AD] overflow-hidden rounded-lg">
      <Image
        src="/hero-bg.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-contain object-center"
        sizes="100vw"
      />

    </div>
  );
}

import Image from "next/image";

export default function Hero() {
  return (
    <div className="hero min-h-[50vh] lg:min-h-[70vh] relative bg-[#0a0a0a] overflow-hidden">
      <Image
        src="/hero-bg.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-contain object-center"
        sizes="100vw"
      />

      {/* Optional: A very light gradient overlay to blend the image edges */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/40 z-10"></div>

      <div className="hero-content text-center text-neutral-content relative z-20 px-4">
        
          
          <button className="btn btn-primary">Start Exploring</button>
      </div>
    </div>
  );
}

import BioSpotlight from "@/components/home/BioSpotlight";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import Hero from "@/components/home/Hero";
import MediaSpotlight from "@/components/home/MediaSpotlight";
import NewsEvents from "@/components/home/NewsEvents";
import Newsletter from "@/components/home/Newsletter";
import PopularSongs from "@/components/home/PopularSongs";
import Publications from "@/components/home/Publications";
import SupportSection from "@/components/home/SupportSection";
import Timeline from "@/components/home/Timeline";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        {/* <FeaturedBooks></FeaturedBooks> */}
        <BioSpotlight></BioSpotlight>
        <MediaSpotlight></MediaSpotlight>
        <PopularSongs></PopularSongs>
        
        <Publications></Publications>
        <UpcomingEvents></UpcomingEvents>
        {/* <NewsEvents></NewsEvents> */}
        {/* <Timeline></Timeline> */}
        <SupportSection></SupportSection>
        <Newsletter></Newsletter>
      </main>
    </>
  );
}

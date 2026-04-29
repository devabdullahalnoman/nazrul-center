import ArchiveLibrary from "@/components/home/ArchiveLibrary";
import BioSpotlight from "@/components/home/BioSpotlight";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import GlobalSearch from "@/components/home/GlobalSearch";
import Hero from "@/components/home/Hero";
import InfoGrid from "@/components/home/InfoGrid";
import MediaSpotlight from "@/components/home/MediaSpotlight";
import NewsEvents from "@/components/home/NewsEvents";
import Newsletter from "@/components/home/Newsletter";
import PopularSongs from "@/components/home/PopularSongs";
import SupportSection from "@/components/home/SupportSection";
import Timeline from "@/components/home/Timeline";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <section className="container mx-auto px-4 py-12 md:py-20">
          <GlobalSearch></GlobalSearch>
          <InfoGrid></InfoGrid>
          <PopularSongs></PopularSongs>
          <BioSpotlight></BioSpotlight>
          <ArchiveLibrary></ArchiveLibrary>
          <FeaturedBooks></FeaturedBooks>
          <UpcomingEvents></UpcomingEvents>
          <NewsEvents></NewsEvents>
          <Timeline></Timeline>
          <MediaSpotlight></MediaSpotlight>
          <SupportSection></SupportSection>
          <Newsletter></Newsletter>
        </section>
      </main>
    </>
  );
}

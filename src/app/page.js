import ArchiveLibrary from "@/components/ArchiveLibrary";
import BioSpotlight from "@/components/BioSpotlight";
import FeaturedBooks from "@/components/FeaturedBooks";
import GlobalSearch from "@/components/GlobalSearch";
import Hero from "@/components/Hero";
import InfoGrid from "@/components/InfoGrid";
import MediaSpotlight from "@/components/MediaSpotlight";
import NewsEvents from "@/components/NewsEvents";
import Newsletter from "@/components/Newsletter";
import PopularSongs from "@/components/PopularSongs";
import SupportSection from "@/components/SupportSection";
import Timeline from "@/components/Timeline";
import UpcomingEvents from "@/components/UpcommingEvents";

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

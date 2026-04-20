import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import NewsEvents from "@/components/NewsEvents";
import GallerySection from "@/components/GallerySection";
import CTASection from "@/components/CTASection";
import eventImg from "@/assets/event-seminar.jpg";

const Events = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero
      eyebrow="Events, News & Gallery"
      title="What's Happening at Russell's"
      description="Workshops, seminars, admissions briefings and community moments — explore everything happening with us."
      image={eventImg}
      crumbs={[{ label: "Home", to: "/" }, { label: "Events" }]}
    />
    <NewsEvents />
    <GallerySection />
    <CTASection />
    <Footer />
  </div>
);

export default Events;

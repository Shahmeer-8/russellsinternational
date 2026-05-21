import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicPageHero from "@/components/DynamicPageHero";
import NewsEvents from "@/components/NewsEvents";
import GallerySection from "@/components/GallerySection";
import CTASection from "@/components/CTASection";

const Events = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <DynamicPageHero
      page="events"
      fallback={{
        eyebrow: "",
        title: "",
        description: "",
        image: "",
        crumbs: [{ label: "Home", to: "/" }, { label: "Events" }],
      }}
    />
    <NewsEvents />
    <GallerySection />
    <CTASection />
    <Footer />
  </div>
);

export default Events;

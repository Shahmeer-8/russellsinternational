import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicPageHero from "@/components/DynamicPageHero";
import StudyDestinations from "@/components/StudyDestinations";
import CTASection from "@/components/CTASection";

const StudyAbroad = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <DynamicPageHero
      page="study-abroad"
      fallback={{
        eyebrow: "",
        title: "",
        description: "",
        image: "",
        crumbs: [{ label: "Home", to: "/" }, { label: "Study Abroad" }],
      }}
    />
    <StudyDestinations />
    <CTASection />
    <Footer />
  </div>
);

export default StudyAbroad;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicPageHero from "@/components/DynamicPageHero";
import LanguagesSection from "@/components/LanguagesSection";
import CTASection from "@/components/CTASection";

const Languages = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <DynamicPageHero
      page="languages"
      fallback={{
        eyebrow: "",
        title: "",
        description: "",
        image: "",
        crumbs: [{ label: "Home", to: "/" }, { label: "Languages" }],
      }}
    />
    <LanguagesSection />
    <CTASection />
    <Footer />
  </div>
);

export default Languages;

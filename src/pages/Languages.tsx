import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LanguagesSection from "@/components/LanguagesSection";
import CTASection from "@/components/CTASection";
import ieltsImg from "@/assets/ielts-prep.jpg";

const Languages = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero
      eyebrow="Language Programs"
      title="Master a New Language. Unlock the World."
      description="IELTS, German, and Korean — taught by certified instructors with proven track records."
      image={ieltsImg}
      crumbs={[{ label: "Home", to: "/" }, { label: "Languages" }]}
    />
    <LanguagesSection />
    <CTASection />
    <Footer />
  </div>
);

export default Languages;

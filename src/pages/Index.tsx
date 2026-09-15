import SiteHeader from "@/components/SiteHeader";
import HeroCarousel from "@/components/HeroCarousel";
import StatsStrip from "@/components/StatsStrip";
import HomeNewsCarousel from "@/components/HomeNewsCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import StudyAbroadSection from "@/components/StudyAbroadSection";
import SkillsFocusSection from "@/components/SkillsFocusSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// StatsStrip and ServicesSection render content that was already editable in the
// admin but appeared nowhere on the site. Both hide themselves when their content
// is empty or switched off, so the owner can remove either from the page without a
// developer.
const Index = () => (
  <div className="min-h-screen bg-page">
    <SiteHeader />
    <HeroCarousel />
    <WhyChooseUs />
    <ServicesSection />
    <StudyAbroadSection />
    <SkillsFocusSection />
    <HomeNewsCarousel />
    <Testimonials />
    {/* The figures read better as the closing argument than as an opening claim:
        by this point the reader has seen what is on offer, and the numbers land
        right before the form rather than before they know what they are for. */}
    <StatsStrip />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;

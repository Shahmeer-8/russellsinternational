import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import DynamicPageHero from "@/components/DynamicPageHero";
import FeaturedCourses from "@/components/FeaturedCourses";
import CTASection from "@/components/CTASection";

const Skills = () => (
  <div className="min-h-screen bg-page">
    <SiteHeader />
    <DynamicPageHero
      page="skills"
      fallback={{
        eyebrow: "",
        title: "",
        description: "",
        image: "",
        crumbs: [{ label: "Home", to: "/" }, { label: "Skills" }],
      }}
    />
    <FeaturedCourses />
    <CTASection />
    <Footer />
  </div>
);

export default Skills;

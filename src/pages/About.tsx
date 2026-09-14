import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicPageHero from "@/components/DynamicPageHero";
import CTASection from "@/components/CTASection";
import AboutStatement from "@/components/AboutStatement";
import AboutFoundation from "@/components/AboutFoundation";
import AboutFounder from "@/components/AboutFounder";
import AboutTeam from "@/components/AboutTeam";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import aboutHeroImg from "@/assets/about-hero.jpg";

/**
 * Order matters here. A family choosing where to send their child reads this page
 * to answer one question — is this place real and competent? So it opens with the
 * claim and the figures that back it, then the principles, then the founder, then
 * the method, and only then the roster. Proof first, people last.
 */
const About = () => (
  <div className="min-h-screen bg-page">
    <Navbar />
    <DynamicPageHero
      page="about"
      fallback={{
        eyebrow: "About Us",
        title: "Change Begins With One Dream",
        description:
          "A premier education consultancy and IT training institute bridging ambition with global opportunity.",
        image: aboutHeroImg,
        crumbs: [{ label: "Home", to: "/" }, { label: "About Us" }],
      }}
    />

    <AboutStatement />
    <AboutFoundation />
    <AboutFounder />
    <HowWeWorkSection />
    <AboutTeam />

    <CTASection />
    <Footer />
  </div>
);

export default About;

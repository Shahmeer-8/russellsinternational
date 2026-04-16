import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import DualFocusSection from "@/components/DualFocusSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import StudyDestinations from "@/components/StudyDestinations";
import InternshipsSection from "@/components/InternshipsSection";
import JobsSection from "@/components/JobsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import NewsEvents from "@/components/NewsEvents";
import GallerySection from "@/components/GallerySection";
import SocialClubSection from "@/components/SocialClubSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background scroll-smooth">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <DualFocusSection />
    <FeaturedCourses />
    <StudyDestinations />
    <InternshipsSection />
    <JobsSection />
    <WhyChooseUs />
    <Testimonials />
    <NewsEvents />
    <GallerySection />
    <SocialClubSection />
    <CTASection />
    <ContactSection />
    <Footer />
    {/* Floating mobile CTA */}
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <a href="#contact" className="btn-accent flex items-center gap-2 text-sm px-5 py-3 rounded-full shadow-lg">
        💬 Inquire Now
      </a>
    </div>
  </div>
);

export default Index;

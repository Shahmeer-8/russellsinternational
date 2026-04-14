import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DualFocusSection from "@/components/DualFocusSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import StudyDestinations from "@/components/StudyDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import NewsEvents from "@/components/NewsEvents";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background scroll-smooth">
    <Navbar />
    <HeroSection />
    <DualFocusSection />
    <FeaturedCourses />
    <StudyDestinations />
    <WhyChooseUs />
    <Testimonials />
    <NewsEvents />
    <CTASection />
    <ContactSection />
    <Footer />
    {/* Floating mobile CTA */}
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <a href="#contact" className="btn-accent flex items-center gap-2 text-sm px-5 py-3 rounded-full shadow-lg">
        💬 Inquire Now
      </a>
    </div>
  </div>
);

export default Index;

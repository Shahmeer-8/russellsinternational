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
  <div className="min-h-screen bg-background">
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
  </div>
);

export default Index;

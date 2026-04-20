import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import HomePreviews from "@/components/HomePreviews";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroCarousel />
    <HomePreviews />
    <AboutSection />
    <WhyChooseUs />
    <Testimonials />
    <CTASection />
    <ContactSection />
    <Footer />
    {/* Floating mobile CTA */}
    <div className="fixed bottom-6 right-6 z-40 lg:hidden">
      <a href="#contact" className="btn-accent flex items-center gap-2 text-sm px-5 py-3 rounded-full shadow-lg">
        💬 Inquire Now
      </a>
    </div>
  </div>
);

export default Index;

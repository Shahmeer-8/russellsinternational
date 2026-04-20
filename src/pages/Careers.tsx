import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import JobsSection from "@/components/JobsSection";
import InternshipsSection from "@/components/InternshipsSection";
import CTASection from "@/components/CTASection";
import jobsImg from "@/assets/jobs-career.jpg";

const Careers = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero
      eyebrow="Careers"
      title="Jobs, Internships & Career Growth"
      description="Discover open positions at Russell's International and our partner companies, plus structured internships to launch your career."
      image={jobsImg}
      crumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
    />
    <JobsSection />
    <InternshipsSection />
    <CTASection />
    <Footer />
  </div>
);

export default Careers;

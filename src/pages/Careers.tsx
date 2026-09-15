import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import DynamicPageHero from "@/components/DynamicPageHero";
import JobsSection from "@/components/JobsSection";
import InternshipsSection from "@/components/InternshipsSection";
import InternshipRecordSection from "@/components/InternshipRecordSection";
import CareerApplyForm from "@/components/CareerApplyForm";
import CTASection from "@/components/CTASection";

const Careers = () => (
  <div className="min-h-screen bg-page">
    <SiteHeader />
    <DynamicPageHero
      page="careers"
      fallback={{
        eyebrow: "",
        title: "",
        description: "",
        image: "",
        crumbs: [{ label: "Home", to: "/" }, { label: "Careers" }],
      }}
    />
    <JobsSection />
    <InternshipsSection />
    <InternshipRecordSection />
    <CareerApplyForm />
    <CTASection />
    <Footer />
  </div>
);

export default Careers;

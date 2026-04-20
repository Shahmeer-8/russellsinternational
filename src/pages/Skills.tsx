import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FeaturedCourses from "@/components/FeaturedCourses";
import CTASection from "@/components/CTASection";
import skillImg from "@/assets/skill-training.jpg";

const Skills = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero
      eyebrow="Skills & Courses"
      title="Industry-Ready IT & Tech Training"
      description="Premium paid programs and free NAVTTC government-funded courses — designed to make you job-ready from day one."
      image={skillImg}
      crumbs={[{ label: "Home", to: "/" }, { label: "Skills" }]}
    />
    <FeaturedCourses />
    <CTASection />
    <Footer />
  </div>
);

export default Skills;

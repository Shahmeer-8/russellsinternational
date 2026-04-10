import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground font-heading mb-5 leading-tight">
            Don't Just Dream It —<br />Build It With Us
          </h2>
          <p className="text-primary-foreground/60 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Whether you want to master in-demand skills or pursue education abroad, your journey begins with a single step.
          </p>
          <a href="#contact" className="btn-accent inline-flex items-center gap-2 text-base px-10 py-4 group">
            Book Free Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;

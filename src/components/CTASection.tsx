import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="hero-bg rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur px-4 py-2 rounded-full text-sm text-primary-foreground/90 font-medium mb-6">
            <Sparkles className="w-4 h-4" /> Limited seats available for 2026
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground font-heading mb-4 leading-tight">
            Start Your Journey Today
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-lg mx-auto">
            Whether you want to master in-demand skills or pursue education abroad, we're here to guide you every step of the way.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn-cta inline-flex items-center gap-2 text-base px-8 py-4">
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#courses" className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-primary-foreground/20 text-base">
              Browse Programs
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;

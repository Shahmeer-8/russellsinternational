import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CTASection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(224 71% 16%), hsl(24 95% 53%))" }}>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-float" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-glow-pulse" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-heading mb-5 leading-tight">
              Don't Just Dream It —<br />Build It With Us
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-8 max-w-xl mx-auto">
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
};

export default CTASection;

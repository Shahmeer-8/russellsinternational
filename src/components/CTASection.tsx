import ctaBg from "@/assets/cta-bg.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={ctaBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(224,71%,10%)/0.6] to-[hsl(260,50%,18%)/0.6]" />
    </div>

    {/* Floating orbs */}
    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[80px] animate-glow-pulse" />
    <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-[hsl(260,80%,60%)]/20 rounded-full blur-[60px] animate-glow-pulse" style={{ animationDelay: "1s" }} />

    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full text-sm text-white/90 font-medium mb-8">
          <Sparkles className="w-4 h-4 text-yellow-400" /> Limited seats available for 2026
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white font-heading mb-6 leading-tight">
          Start Your Journey With{" "}
          <span className="text-gradient">Russell's International</span>{" "}
          Today
        </h2>
        <p className="text-white/50 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Whether you want to master in-demand skills or pursue education abroad, we're here to guide you every step of the way.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn-accent inline-flex items-center gap-2 text-base px-10 py-4 group">
            Book Free Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#courses" className="btn-glass inline-flex items-center gap-2 text-base px-10 py-4">
            Browse Programs
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;

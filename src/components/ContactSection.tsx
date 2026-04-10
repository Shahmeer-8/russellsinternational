import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-20 md:py-28 bg-section-alt">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title mt-3 mb-5">Ready to Take the Next Step?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Fill in the form and our team will get back to you within 24 hours with personalized guidance.
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, label: "+92 304 111 2233" },
                { icon: Mail, label: "info@russellsinternational.com" },
                { icon: MapPin, label: "Islamabad, Pakistan" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <c.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card p-7 md:p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold text-lg font-heading text-foreground mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
                <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                <select className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30">
                  <option>I'm interested in...</option>
                  <option>IT Training Courses</option>
                  <option>Study Abroad</option>
                  <option>Both</option>
                </select>
                <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none" />
                <button type="submit" className="btn-accent w-full text-base py-3.5 flex items-center justify-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

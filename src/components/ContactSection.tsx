import { Mail, Phone, MapPin, Send, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSettings, useSubmitContact } from "@/hooks/api";
import { useSectionCopy, useSectionOptions } from "@/hooks/useSectionCopy";

const ContactSection = () => {
  const copy = useSectionCopy("home", "contact");
  /**
   * The programme the visitor was reading about, if they arrived from a details
   * panel's "Inquire Now".
   *
   * Sending someone from a page about IELTS coaching to a blank form and making
   * them describe what they had just been reading is the kind of small friction
   * that loses an enquiry. The form says what it is about, and the message starts
   * written — still editable, because an assumption in a text box is a suggestion
   * rather than a decision.
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const about = searchParams.get("about")?.trim() || "";
  // The choices here decide how an enquiry gets routed, so they have to follow
  // what the institute actually offers — the hardcoded three predated the
  // language programmes and the internships entirely.
  const interests = useSectionOptions("home", "contact", "interest", [
    "IT Training Courses",
    "Study Abroad",
    "Both",
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { ref, visible } = useScrollReveal();

  const { data: settingsData } = useSettings('contact');
  const settings = settingsData?.data ?? {};
  const phone   = settings['phone']   ?? '+92 304 111 2233';
  const email   = settings['email']   ?? 'info@russellsinternational.com';
  const address = settings['address'] ?? 'Islamabad, Pakistan';

  const { mutate: submitContact, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    submitContact(
      { name: fd.get('name') as string, phone: fd.get('phone') as string, email: fd.get('email') as string, interest: fd.get('interest') as string, message: fd.get('message') as string },
      {
        onSuccess: () => setSubmitted(true),
        onError: (err) => setError(err instanceof Error ? err.message : "We couldn't send your message. Please try again."),
      }
    );
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-section-alt">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="section-label">{copy("eyebrow", "Get In Touch")}</span>
            <h2 className="section-title mt-3 mb-5">{copy("title", "Ready to Take the Next Step?")}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {copy("subtitle", "Fill in the form and our team will get back to you within 24 hours with personalized guidance.")}
            </p>
            <div className="space-y-4">
              {[
                { icon: Phone, label: phone },
                { icon: Mail,  label: email },
                { icon: MapPin, label: address },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {about && (
                  <div className="flex items-start justify-between gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
                    <p className="text-sm text-foreground">
                      <span className="text-muted-foreground">Enquiring about</span>{" "}
                      <span className="font-semibold">{about}</span>
                    </p>
                    <button
                      type="button"
                      // Clears the query string too, so a reload or a shared link
                      // does not resurrect a programme the visitor dismissed.
                      onClick={() => setSearchParams({}, { replace: true })}
                      aria-label="Clear the programme this enquiry is about"
                      className="-m-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="name" aria-label="Full Name" type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                  <input name="phone" aria-label="Phone Number" type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
                <input name="email" aria-label="Email Address" type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                {/* The programme joins the list and is selected, so the enquiry is
                    filed under its name in the admin rather than under a generic
                    category — it is the single most useful thing the office can
                    know when they pick the enquiry up. Still a dropdown, so the
                    visitor can change it. */}
                <select
                  key={`interest-${about}`}
                  name="interest"
                  aria-label="Interest"
                  defaultValue={about || ""}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="">I'm interested in...</option>
                  {about && !interests.includes(about) && <option value={about}>{about}</option>}
                  {interests.map((interest) => (
                    <option key={interest} value={interest}>{interest}</option>
                  ))}
                </select>
                {/* `key` matters: React keeps an uncontrolled textarea's value
                    across re-renders, so without it the prefilled message would
                    not change when the visitor opens a different programme. */}
                <textarea
                  key={`message-${about}`}
                  name="message"
                  aria-label="Your Message"
                  placeholder="Your Message"
                  rows={4}
                  defaultValue={about ? `I'd like to know more about ${about}.` : ""}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                />
                {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
                <button type="submit" disabled={isPending} className="btn-accent w-full text-base py-3.5 flex items-center justify-center gap-2 disabled:opacity-60">
                  {isPending ? 'Sending…' : 'Send Message'} <Send className="w-4 h-4" />
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

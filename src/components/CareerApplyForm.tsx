import { useState } from "react";
import { Send, Upload, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSubmitCareerApplication } from "@/hooks/api";

const positions = [
  "Web Developer",
  "AI/ML Engineer",
  "Digital Marketing Specialist",
  "IELTS Trainer",
  "Admissions Officer",
  "Internship — General",
  "Other",
];

const CareerApplyForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState("");
  const { ref, visible } = useScrollReveal();
  const { mutate: submitApplication, isPending } = useSubmitCareerApplication();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const fd = new FormData(e.currentTarget);
    const positionTitle = String(fd.get("position_title") ?? "");
    const cv = fd.get("cv");

    submitApplication(
      {
        application_type: positionTitle.toLowerCase().includes("internship") ? "internship" : "job",
        position_title: positionTitle,
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        cover_letter: String(fd.get("cover_letter") ?? ""),
        cv: cv instanceof File && cv.name ? cv : undefined,
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: (err) => setError(err instanceof Error ? err.message : "We couldn't submit your application. Please try again."),
      }
    );
  };

  return (
    <section id="apply" className="py-20 md:py-28 bg-section-alt">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="section-label">Apply Now</span>
          <h2 className="section-title mt-3">Join the Russell's Team</h2>
          <p className="text-muted-foreground mt-4">
            Fill in your details and upload your CV. Our HR team will get back to shortlisted candidates within 5 working days.
          </p>
        </div>

        <div className="premium-card p-7 md:p-10 max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-cta/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-cta" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Application Received!</h3>
              <p className="text-muted-foreground">Thank you. We'll review your application and reach out soon.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="career-name" className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">Full Name *</label>
                  <input id="career-name" name="name" type="text" required maxLength={100} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
                <div>
                  <label htmlFor="career-email" className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">Email *</label>
                  <input id="career-email" name="email" type="email" required maxLength={150} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="career-phone" className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">Phone</label>
                  <input id="career-phone" name="phone" type="tel" maxLength={20} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
                <div>
                  <label htmlFor="career-position" className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">Position Applied For *</label>
                  <select id="career-position" name="position_title" required className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30">
                    <option value="">Select a position</option>
                    {positions.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="career-cv" className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">Upload CV (PDF, DOC)</label>
                <label htmlFor="career-cv" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-dashed border-border cursor-pointer hover:border-accent transition-colors">
                  <Upload className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {fileName || "Click to upload your CV"}
                  </span>
                  <input
                    name="cv"
                    id="career-cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="career-cover-letter" className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">Cover Message</label>
                <textarea id="career-cover-letter" name="cover_letter" rows={4} maxLength={5000} placeholder="Tell us why you're a great fit..." className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none" />
              </div>

              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

              <button type="submit" disabled={isPending} className="btn-accent w-full text-base py-3.5 flex items-center justify-center gap-2 disabled:opacity-60">
                {isPending ? "Submitting..." : "Submit Application"} <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerApplyForm;

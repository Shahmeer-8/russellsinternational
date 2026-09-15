import { X, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

interface DetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /**
   * Link to a brochure, when the record actually has one.
   *
   * Every drawer on the site used to end with a "Download PDF" button that had no
   * href and no handler — it did nothing, on courses, jobs, internships, services,
   * destinations and events alike. Events are where it was noticed, because an
   * events listing offering a PDF is the wrong thing entirely.
   */
  pdfUrl?: string | null;
  /**
   * What this panel is about, carried into the enquiry form.
   *
   * Without it "Inquire Now" was a bare `#contact` anchor, and the contact form
   * only exists on the home page — so on Skills, Careers, Languages and Study
   * Abroad the button went nowhere at all. Now it takes the reader to the form
   * and tells the form which programme they were reading about.
   */
  inquireAbout?: string;
}

const DetailDrawer = ({ open, onClose, title, children, pdfUrl, inquireAbout }: DetailDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute top-0 right-0 h-full w-full max-w-lg bg-background shadow-2xl border-l border-border animate-slide-in-right overflow-y-auto"
      >
        <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-heading font-bold text-lg text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-lg border-t border-border px-6 py-4 flex gap-3">
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-accent flex-1 inline-flex items-center justify-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" /> Download Brochure
            </a>
          )}
          <Link
            to={inquireAbout ? `/?about=${encodeURIComponent(inquireAbout)}#contact` : "/#contact"}
            onClick={onClose}
            className="btn-primary flex-1 inline-flex items-center justify-center gap-2 text-sm"
          >
            Inquire Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailDrawer;

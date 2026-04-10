import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Ayesha Khan",
    program: "Study Abroad – UK",
    text: "Russell's International made my dream of studying in the UK a reality. Their guidance was phenomenal from application to visa approval.",
    avatar: "AK",
  },
  {
    name: "Omer Ali",
    program: "Full Stack Development",
    text: "The web development course was incredibly hands-on. I landed a job within two months of completing the program. Highly recommended!",
    avatar: "OA",
  },
  {
    name: "Maria Santos",
    program: "Study Abroad – Canada",
    text: "I was overwhelmed by the university options, but the team helped me choose the perfect fit. Now I'm thriving at a top Canadian university.",
    avatar: "MS",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-20 md:py-28 bg-muted/30">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="section-label">Student Stories</span>
        <h2 className="section-title mt-3">Don't Just Take Our Word For It</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="glass-card p-8 relative">
            <Quote className="w-8 h-8 text-accent/20 absolute top-6 right-6" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full hero-bg flex items-center justify-center text-sm font-bold text-primary-foreground">
                {r.avatar}
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.program}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

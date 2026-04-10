import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Ayesha Khan",
    program: "Study Abroad – UK",
    text: "Russell's International made my dream of studying in the UK a reality. Their guidance was phenomenal from application to visa approval.",
    avatar: "AK",
    gradient: "from-[hsl(217,91%,60%)] to-[hsl(260,80%,60%)]",
  },
  {
    name: "Omer Ali",
    program: "Full Stack Development",
    text: "The web development course was incredibly hands-on. I landed a job within two months of completing the program. Highly recommended!",
    avatar: "OA",
    gradient: "from-[hsl(260,80%,60%)] to-[hsl(280,70%,50%)]",
  },
  {
    name: "Maria Santos",
    program: "Study Abroad – Canada",
    text: "I was overwhelmed by the university options, but the team helped me choose the perfect fit. Now I'm thriving at a top Canadian university.",
    avatar: "MS",
    gradient: "from-[hsl(200,80%,50%)] to-[hsl(217,91%,60%)]",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 md:py-32 bg-mesh relative overflow-hidden">
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center mb-16">
        <span className="section-label">Student Stories</span>
        <h2 className="section-title mt-3">Don't Just Take Our Word For It</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="glass-card p-8 relative group overflow-hidden">
            {/* Glow accent on top */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${r.gradient}`} />
            
            <Quote className="w-10 h-10 text-accent/10 absolute top-6 right-6" />
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
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

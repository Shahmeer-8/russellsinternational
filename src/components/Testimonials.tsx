import { Star, Quote } from "lucide-react";
import ayeshaImg from "@/assets/student-ayesha.jpg";
import omerImg from "@/assets/student-omer.jpg";
import mariaImg from "@/assets/student-maria.jpg";

const reviews = [
  {
    name: "Ayesha Khan",
    program: "Study Abroad – UK",
    text: "Russell's International made my dream of studying in the UK a reality. Their guidance was phenomenal from application to visa approval.",
    image: ayeshaImg,
  },
  {
    name: "Omer Ali",
    program: "Full Stack Development",
    text: "The web development course was incredibly hands-on. I landed a job within two months of completing the program. Highly recommended!",
    image: omerImg,
  },
  {
    name: "Maria Santos",
    program: "Study Abroad – Canada",
    text: "I was overwhelmed by the university options, but the team helped me choose the perfect fit. Now I'm thriving at a top Canadian university.",
    image: mariaImg,
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="section-label">Student Stories</span>
        <h2 className="section-title mt-3">Real Success, Real People</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Hear from students who transformed their futures with us.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="premium-card p-7 relative group">
            <Quote className="w-8 h-8 text-muted/80 absolute top-6 right-6" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <img
                src={r.image}
                alt={r.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-border"
                loading="lazy"
                width={512}
                height={512}
              />
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

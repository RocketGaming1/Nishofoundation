import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Empowering the Aramaic community: Education and Culture",
      subtitle: "THE BRIDGE BETWEEN EASTERN WISDOM & WESTERN THOUGHT",
      tagline: "LEARNING HISTORY HERITAGE Future",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3d2817] via-[#2d1f12] to-[#1a1108]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2670')] bg-cover bg-center opacity-40" />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn(
                "transition-all duration-700",
                currentSlide === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 absolute"
              )}
            >
              <p className="text-primary-foreground/80 text-sm md:text-base tracking-[0.3em] mb-6 animate-fade-in uppercase">
                {slide.tagline}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in leading-tight max-w-5xl mx-auto">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 tracking-wider animate-fade-in max-w-3xl mx-auto">
                {slide.subtitle}
              </p>
              <div className="mt-12 flex gap-4 justify-center animate-fade-in">
                <a href="#about">
                  <Button
                    size="lg"
                    className="bg-foreground/90 text-background hover:bg-foreground transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </a>
                <a href="#support">
                  <Button
                    size="lg"
                    className="bg-[hsl(0,85%,50%)] text-primary-foreground hover:bg-[hsl(0,85%,45%)] transition-all duration-300 shadow-lg"
                  >
                    Support Us
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

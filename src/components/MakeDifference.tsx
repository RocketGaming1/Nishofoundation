import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, Users, Globe, Lightbulb } from "lucide-react";

const MakeDifference = () => {
  const programs = [
    {
      icon: BookOpen,
      title: "Educational programs",
      description:
        "In collaboration with experts, we offer programs and projects with a social, cultural and/or religious character, aimed at stimulating curiosity and knowledge that are accessible to everyone.",
    },
    {
      icon: Calendar,
      title: "Cultural events",
      description:
        "Celebrating and encouraging Syriac Aramaic traditions through events.",
    },
    {
      icon: Users,
      title: "Social engagements",
      description:
        "Initiating and supporting activities in which individuals, groups or organizations are committed to the community and society. This can range from volunteering and social inclusion to supporting local projects that contribute to the well-being of others.",
    },
    {
      icon: Globe,
      title: "Cultural integration",
      description:
        "Promoting integration into society, while preserving one's own language and culture.",
    },
    {
      icon: Lightbulb,
      title: "Creating new projects",
      description:
        "We are open to new, innovative ideas and projects that contribute to the preservation of the Syriac Aramaic language and culture, and that are of significance to the community and society.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            YOU CAN MAKE A DIFFERENCE
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us in preserving and celebrating the rich heritage of the Aramaic community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card
                key={index}
                className="group border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-card"
              >
                <CardContent className="p-8 relative">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-200">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MakeDifference;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Ticket sales for film: started",
      description:
        "The True Shepherd documentary film tickets are now available for purchase.",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670",
      link: "https://www.nishofoundation.com/post-2/",
    },
    {
      title: "True Shepherd in Diemen cinema: a great success",
      description:
        "A successful screening of the True Shepherd documentary in Diemen cinema.",
      image: "https://images.unsplash.com/photo-1574267432644-f86c6fe4341c?q=80&w=2670",
      link: "https://www.nishofoundation.com/title/",
    },
    {
      title: "Film premiere true Shepherd",
      description:
        "The premiere of our documentary celebrating Archbishop Mor Julius Yeshu Cicek.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2670",
      link: "https://www.nishofoundation.com/post-3/",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            PROJECTS
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Initiatives that bridge tradition and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="group overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 bg-card h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                    Learn More
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

const LatestNews = () => {
  const mainNews = [
    {
      title: "MUSIC VIDEO OF THE NEW SONG 'TRUE SHEPHERD' IN HONOR OF ARCHBISHOP MOR JULIUS YESHU CICEK NOW ONLINE",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2670",
      link: "https://www.nishofoundation.com/music-video-of-the-new-song-true-shepherd-in-honor-of-archbishop-mor-julius-yeshu-cicek-now-online/",
    },
    {
      title: "HUNDREDS OF FAITHFUL PRESENT DURING 19-YEAR COMMEMORATION OF ARCHBISHOP CICEK",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670",
      link: "https://www.nishofoundation.com/hundreds-of-believers-present-during-the-19-year-commemoration-of-archbishop-cicek-at-the-mor-ephrem-monastery/",
    },
    {
      title: "FILM SCREENING TRUE SHEPHERD AT CAREINSTITUTION DE POSTS IN ENSCHEDE",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670",
      link: "https://www.nishofoundation.com/film-screening-true-shepherd-at-careinstitution-de-posts-in-enschede/",
    },
  ];

  const moreNews = [
    {
      date: "MARCH 5, 2023",
      title: "True Shepherd in Diemen cinema a great success",
      link: "https://www.nishofoundation.com/title/",
    },
    {
      date: "OCTOBER 31, 2023",
      title: "Film premiere True Shepherd: a successful event",
      link: "https://www.nishofoundation.com/post-3/",
    },
    {
      date: "OCTOBER 24, 2023",
      title: "Ticket sales for the film True Shepherd started",
      link: "https://www.nishofoundation.com/post-2/",
    },
  ];

  return (
    <section id="news" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            LATEST NEWS
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainNews.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="group overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 bg-card h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 line-clamp-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                    Read More
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* More News Section */}
        <div className="bg-muted p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            MORE NEWS
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {moreNews.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 border border-border hover:border-primary transition-all duration-200"
              >
                <p className="text-sm text-muted-foreground mb-3">
                  {item.date}
                </p>
                <h4 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;

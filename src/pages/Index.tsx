import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestNews from "@/components/LatestNews";
import MakeDifference from "@/components/MakeDifference";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <LatestNews />
      <MakeDifference />
      <Projects />
      <Footer />
    </div>
  );
};

export default Index;

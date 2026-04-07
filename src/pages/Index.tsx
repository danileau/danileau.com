import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DerWeg from "@/components/DerWeg";
import ProofOfWork from "@/components/ProofOfWork";
import Querschnitt from "@/components/Querschnitt";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <DerWeg />
      <ProofOfWork />
      <Querschnitt />
      <Education />
      <Footer />
    </div>
  );
};

export default Index;

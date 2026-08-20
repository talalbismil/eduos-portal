import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import WhyEduOS from '@/components/WhyEduOS';
import TechStack from '@/components/TechStack';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <About />

      <Features />

      <WhyEduOS />

      <TechStack />

      <CTA />

      <Footer />
    </>
  );
}

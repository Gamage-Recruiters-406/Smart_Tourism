import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import DestinationCards from '../components/DestinationCards';
import FeaturedSection from '../components/FeaturedSection';
import TestimonialsSection from '../components/TestimonialsSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main>
        <HeroSection />
        <CategoryFilter />
        <DestinationCards />
        <FeaturedSection />
        <TestimonialsSection />
      </main>
    </div>
  );
};

export default Home;

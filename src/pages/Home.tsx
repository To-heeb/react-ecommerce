import Banner from "../components/Banner";
import BestSellerSection from "../components/BestSellerSection";
import DiscountSection from "../components/DiscountSection";
import FactSection from "../components/FactSection";
import FeatureSection from "../components/FeatureSection";
import FruitSection from "../components/FruitSection";
import HeroSection from "../components/HeroSection";
import TestimonialSection from "../components/TestimonialSection";
import VegetableSection from "../components/VegetableSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <FruitSection />
      <DiscountSection />
      <VegetableSection />
      <Banner />
      <BestSellerSection />
      <FactSection />
      <TestimonialSection />
    </>
  );
};

export default Home;

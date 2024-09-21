import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import TrendingProducts from '../components/TrendingProducts';
import DealsAndDiscounts from '../components/DealsAndDiscounts';
import Testimonials from '../components/Testimonials';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';
import '../PagesStyle/HomePage.css';


function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <DealsAndDiscounts />
      <Testimonials />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}

export default HomePage;
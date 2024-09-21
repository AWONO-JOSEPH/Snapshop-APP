import React, { useEffect, useRef, useState } from 'react';
import '../ComponentStyles/FeaturedCategories.css';
import elect from '../assets/elect.jpg';
import Fashion from '../assets/Fashion.jpg';
import Garden from '../assets/garden.jpg';
import sport from '../assets/sport.jpg';
import toy from '../assets/toys.jpg';

function FeaturedCategories() {
  const categories = [
    { name: 'Electronics', image: elect },
    { name: 'Fashion', image: Fashion },
    { name: 'Home & Garden', image: Garden },
    { name: 'Sports', image: sport },
    { name: 'Toys', image: toy },
  ];

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2); // Number of items to show (2 on larger screens)

  // Dynamically update the number of items to show based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsToShow(1); // Show 1 item on mobile
      } else {
        setItemsToShow(2); // Show 2 items on larger screens
      }
    };

    handleResize(); // Set the correct number of items on initial render
    window.addEventListener('resize', handleResize); // Add resize event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
    };
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const nextIndex = (currentIndex + itemsToShow) % categories.length;
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.offsetWidth * nextIndex / itemsToShow, // Divide by itemsToShow for smooth scrolling
          behavior: 'smooth',
        });
      }
      setCurrentIndex(nextIndex);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(scrollInterval); // Cleanup interval on unmount
  }, [currentIndex, categories.length, itemsToShow]);

  return (
    <section className="featured-categories">
      <h2>Featured Categories</h2>
      <div className="category-gallery" ref={scrollRef}>
        {categories.map((category, index) => (
          <div className="categories-item" key={index}>
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCategories;

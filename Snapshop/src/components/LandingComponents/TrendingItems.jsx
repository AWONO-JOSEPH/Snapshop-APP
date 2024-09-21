import React from 'react';
import '../LandingStyles/TrendingItems.css';

function TrendingItems({ items, onItemClick }) {
  return (
    <section className="trending-items">
      <h2>Trending Items</h2>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-4">
        {items.map(item => (
          <div key={item.id} className="shadow-md" onClick={() => onItemClick(item)}>
            <img 
              src={Array.isArray(item.images) ? item.images[0] : item.images} 
              alt={item.name} 
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="town">{item.town}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingItems;
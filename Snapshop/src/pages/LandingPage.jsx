import React, { useState } from 'react';
import { useGetProductsQuery } from '../components/store/store/api/ProductApi';  
import Header from '../components/LandingComponents/Header';
import Sidebar from '../components/LandingComponents/Sidebar';
import TrendingItems from '../components/LandingComponents/TrendingItems';
import ItemDetail from '../components/LandingComponents/ItemDetail';
import '../PagesStyle/LandingPage.css';
import FloatingButton from '../components/LandingComponents/FloatingButton';
import ArticlesSold from './ArticlesSold'; 
import ArticlesBought from './ArticlesBought';

function LandingPage() {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSection, setActiveSection] = useState('Shop All');
  const [showArticlesBought, setShowArticlesBought] = useState(false);
  const [showArticlesSold, setShowArticlesSold] = useState(false);

  const { data: products = [], error, isLoading } = useGetProductsQuery();

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveSection('Shop All');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'Articles Bought') {
      setShowArticlesBought(true);
      setShowArticlesSold(false);
    } else if (section === 'Articles Sold') {
      setShowArticlesSold(true);
      setShowArticlesBought(false);
    } else {
      setShowArticlesBought(false);
      setShowArticlesSold(false);
    }
  };

  const filteredProducts = selectedCategory === 'Shop All'
    ? products 
    : selectedCategory
      ? products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase())
      : products;

  return (
    <div className="app">
      <Sidebar 
        onCategorySelect={handleCategorySelect} 
        onSectionChange={handleSectionChange}
      />
      <div className="main-content">
        <Header onSearchToggle={handleSearchToggle} />
        {showSearch && <input type="text" placeholder="Search..." className="search-bar" />}

        {isLoading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error fetching products.</p>
        ) : (
          <TrendingItems items={filteredProducts} onItemClick={handleItemClick} />
        )}

        {selectedItem && <ItemDetail item={selectedItem} onClose={handleCloseDetail} />}
      </div>
      <FloatingButton />

      <div className={`popup-container ${showArticlesBought ? 'show' : ''}`}>
        <ArticlesBought />
        <button className="close-popup" onClick={() => setShowArticlesBought(false)}>Close</button>
      </div>

      <div className={`popup-container ${showArticlesSold ? 'show' : ''}`}>
        <ArticlesSold />
        <button className="close-popup" onClick={() => setShowArticlesSold(false)}>Close</button>
      </div>
    </div>
  );
}

export default LandingPage;
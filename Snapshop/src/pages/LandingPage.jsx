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
  const [selectedCategory, setSelectedCategory] = useState(null); // { label, value }
  const [activeSection, setActiveSection] = useState('Shop All');
  const [showArticlesBought, setShowArticlesBought] = useState(false);
  const [showArticlesSold, setShowArticlesSold] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [imageResults, setImageResults] = useState([]);

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

  // Filter products based on searchValue
  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()))
    .filter(product => !selectedCategory || (product.category && product.category === selectedCategory.value));

  const displayItems = imageResults.length ? imageResults : filteredProducts;

  return (
    <div className="app">
      <Sidebar 
        onCategorySelect={handleCategorySelect} 
        onSectionChange={handleSectionChange}
      />
      <div className="main-content">
        <Header
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onImageResults={(results) => {
            setImageResults(Array.isArray(results) ? results : []);
          }}
        />
        {showSearch && <input type="text" placeholder="Search..." className="search-bar" />}

        {isLoading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error fetching products.</p>
        ) : (
          <>
            {selectedCategory && (
              <h3 style={{ padding: '8px 16px' }}>Category: {selectedCategory.label}</h3>
            )}
            <TrendingItems
              items={displayItems}
              onItemClick={handleItemClick}
              title={imageResults.length ? 'Image search results' : 'Recommendations'}
            />
          </>
        )}

        {selectedItem && <ItemDetail item={selectedItem} onClose={handleCloseDetail} />}
      </div>
      <FloatingButton />

      <div className={`popup-container ${showArticlesBought ? 'show' : ''}`}>
        <ArticlesBought />
        <button className="close-popup" onClick={() => setShowArticlesBought(false)}>Close</button>
      </div>

      {showArticlesSold && (
        <div className="popup-container show">
          <ArticlesSold />
          <button className="close-popup" onClick={() => setShowArticlesSold(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
import React, { useState } from 'react';
import { FaShoppingBag, FaUserCircle, FaSignOutAlt, FaThLarge, FaAngleDown, FaAngleUp, FaPlus, FaShoppingBasket, FaTag } from 'react-icons/fa';
import '../LandingStyles/Sidebar.css';

function Sidebar({ onCategorySelect, onSectionChange }) {
  const [showCategories, setShowCategories] = useState(false);

  const categories = ['fashion clothing', 'fashion accessories', 'fashion shoes', 'home decor', 'artisanal jewelry', 'artisanal pottery', 'artisanal textiles'];

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    setShowCategories(false); // Hide dropdown after selecting category
  };

  return (
    <aside className="enhanced-sidebar">
      <div className="enhanced-sidebar__header">
        <h2 className="enhanced-sidebar__app-name">Snapshop</h2>
      </div>
      <nav className="enhanced-sidebar__nav">
        <ul className="enhanced-sidebar__menu">
          <li className="enhanced-sidebar__menu-item" onClick={() => onSectionChange('Shop All')}>
            <FaShoppingBag className="icon-large" /> <span>Shop All</span>
          </li>
          <li className="enhanced-sidebar__menu-item" onClick={() => onSectionChange('Articles Bought')}>
            <FaShoppingBasket className="icon-large" /> <span>Articles Bought</span>
          </li>
          <li className="enhanced-sidebar__menu-item" onClick={() => onSectionChange('Articles Sold')}>
            <FaTag className="icon-large" /> <span>Articles Sold</span>
          </li>
          <li className="enhanced-sidebar__menu-item enhanced-sidebar__menu-item--sell">
            <FaPlus className="icon-large" /> <span>Sell an Article</span>
          </li>
          <li className="enhanced-sidebar__menu-item enhanced-sidebar__menu-item--dropdown" onClick={toggleCategories}>
            <FaThLarge className="icon-large" /> <span>Categories</span>
            {showCategories ? <FaAngleUp className="icon-large" /> : <FaAngleDown className="icon-large" />}
          </li>
          {showCategories && (
            <ul className="enhanced-sidebar__category-list">
              {categories.map((category, index) => (
                <li key={index} className="enhanced-sidebar__category-item" onClick={() => handleCategorySelect(category)}>
                  {category}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </nav>
      <div className="enhanced-sidebar__footer">
        <h3 className="enhanced-sidebar__account-header">Account</h3>
        <ul className="enhanced-sidebar__menu">
          <li className="enhanced-sidebar__menu-item">
            <FaUserCircle className="icon-large" /> <span>Profile</span>
          </li>
          <li className="enhanced-sidebar__menu-item">
            <FaSignOutAlt className="icon-large" /> <span>Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;

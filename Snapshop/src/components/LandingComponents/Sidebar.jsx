import React, { useState } from 'react';
import { FaShoppingBag, FaUserCircle, FaSignOutAlt, FaThLarge, FaAngleDown, FaAngleUp, FaPlus, FaShoppingBasket, FaTag } from 'react-icons/fa';
import '../LandingStyles/Sidebar.css';

function Sidebar({ pageClass }) {
  const [showCategories, setShowCategories] = useState(false);

  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Toys', 'Beauty', 'Books', 'Automotive', 'Jewelry', 'Pet Supplies'];

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <aside className={`enhanced-sidebar ${pageClass}`}>
      <div className="enhanced-sidebar__header">
        <h2 className="enhanced-sidebar__app-name">Snapshop</h2>
      </div>
      <nav className="enhanced-sidebar__nav">
        <ul className="enhanced-sidebar__menu">
          <li className="enhanced-sidebar__menu-item">
            <FaShoppingBag /> <span>Shop All</span>
          </li>
          <li className="enhanced-sidebar__menu-item">
            <FaShoppingBasket /> <span>Articles Bought</span>
          </li>
          <li className="enhanced-sidebar__menu-item">
            <FaTag /> <span>Articles Sold</span>
          </li>
          <li className="enhanced-sidebar__menu-item enhanced-sidebar__menu-item--sell">
            <FaPlus /> <span>Sell an Article</span>
          </li>
          <li className="enhanced-sidebar__menu-item enhanced-sidebar__menu-item--dropdown" onClick={toggleCategories}>
            <FaThLarge /> <span>Categories</span>
            {showCategories ? <FaAngleUp className="enhanced-sidebar__dropdown-icon" /> : <FaAngleDown className="enhanced-sidebar__dropdown-icon" />}
          </li>
          {showCategories && (
            <ul className="enhanced-sidebar__category-list">
              {categories.map((category, index) => (
                <li key={index} className="enhanced-sidebar__category-item">{category}</li>
              ))}
            </ul>
          )}
        </ul>
      </nav>
      <div className="enhanced-sidebar__footer">
        <h3 className="enhanced-sidebar__account-header">Account</h3>
        <ul className="enhanced-sidebar__menu">
          <li className="enhanced-sidebar__menu-item">
            <FaUserCircle /> <span>Profile</span>
          </li>
          <li className="enhanced-sidebar__menu-item">
            <FaSignOutAlt /> <span>Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
import React, { useState, useCallback, memo } from 'react';
import '../LandingStyles/Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaShoppingBag,
  FaUserCircle,
  FaSignOutAlt,
  FaThLarge,
  FaAngleDown,
  FaAngleUp,
  FaPlus,
  FaShoppingBasket,
  FaTag,
  FaEnvelopeOpenText,
  FaBookmark
} from 'react-icons/fa';

// Keep static data outside the component to avoid re-creation on each render
const CATEGORIES = [
  { label: 'Fashion - Clothing', value: 'fashion_clothing' },
  { label: 'Fashion - Accessories', value: 'fashion_accessories' },
  { label: 'Fashion - Shoes', value: 'fashion_shoes' },
  { label: 'Home Decoration', value: 'home_decor' },
  { label: 'Artisanal - Jewelry', value: 'artisanal_jewelry' },
  { label: 'Artisanal - Pottery', value: 'artisanal_pottery' },
  { label: 'Artisanal - Textiles', value: 'artisanal_textiles' },
];

function Sidebar({ onCategorySelect, onSectionChange }) {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  const toggleCategories = useCallback(() => {
    setShowCategories(prev => !prev);
  }, []);

  const handleCategorySelect = useCallback(
    (category) => {
      if (typeof onCategorySelect === 'function') onCategorySelect(category);
      if (typeof onSectionChange === 'function') onSectionChange('Shop All');
      setShowCategories(false);
      // Ensure user sees filtered list on the main listing page
      navigate('/landingpage');
    },
    [navigate, onCategorySelect, onSectionChange]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
    // Force a reload to avoid back navigation showing cached protected content
    setTimeout(() => window.location.reload(), 0);
  }, [navigate]);

  // Utility for active link class
  const linkClass = ({ isActive }) =>
    `enhanced-sidebar__menu-item${isActive ? ' enhanced-sidebar__menu-item--active' : ''}`;

  return (
    <div className="enhanced-sidebar-container">

      <aside className="enhanced-sidebar-container" aria-label="Sidebar Navigation">
        <div className="enhanced-sidebar__header">
          <h2 className="enhanced-sidebar__app-name">Snapshop</h2>
        </div>

        <nav className="enhanced-sidebar__nav">
          <ul className="enhanced-sidebar__menu">
            <li>
              <NavLink to="/landingpage" className={linkClass} aria-label="Shop All">
                <FaShoppingBag className="icon-large" aria-hidden="true" />
                <span>Shop All</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/articles-bought" className={linkClass} aria-label="Articles Bought">
                <FaEnvelopeOpenText className="icon-large" aria-hidden="true" />
                <span>My Conversations</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/articles-sold" className={linkClass} aria-label="Articles Sold">
                <FaTag className="icon-large" aria-hidden="true" />
                <span>Articles Sold</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/wishlist" className={linkClass} aria-label="Wishlist">
                <FaBookmark className="icon-large" aria-hidden="true" />
                <span>Wishlist</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/sellpage" className={linkClass} aria-label="Sell an Article">
                <FaPlus className="icon-large" aria-hidden="true" />
                <span>Sell an Article</span>
              </NavLink>
            </li>

            <li>
              <button
                type="button"
                className="enhanced-sidebar__menu-item enhanced-sidebar__menu-item--dropdown"
                onClick={toggleCategories}
                aria-expanded={showCategories}
                aria-controls="sidebar-category-list"
              >
                <FaThLarge className="icon-large" aria-hidden="true" />
                <span>Categories</span>
                {showCategories ? (
                  <FaAngleUp className="icon-large" aria-hidden="true" />
                ) : (
                  <FaAngleDown className="icon-large" aria-hidden="true" />
                )}
              </button>
            </li>

            {showCategories && (
              <ul id="sidebar-category-list" className="enhanced-sidebar__category-list">
                {CATEGORIES.map((category) => (
                  <li key={category.value}>
                    <button
                      type="button"
                      className="enhanced-sidebar__category-item"
                      onClick={() => handleCategorySelect(category)}
                      aria-label={`Select category ${category.label}`}
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </nav>

        <div className="enhanced-sidebar__footer">
          <h3 className="enhanced-sidebar__account-header">Account</h3>
          <ul className="enhanced-sidebar__menu">
            <li>
              <NavLink to="/profile" className={linkClass} aria-label="Profile">
                <FaUserCircle className="icon-large" aria-hidden="true" />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="enhanced-sidebar__menu-item"
                aria-label="Logout"
              >
                <FaSignOutAlt className="icon-large" aria-hidden="true" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default memo(Sidebar);
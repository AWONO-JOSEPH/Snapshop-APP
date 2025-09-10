import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { FaSearch, FaBars, FaEnvelope, FaBell, FaUser, FaSignOutAlt, FaCamera } from 'react-icons/fa';
import { useState as useReactState } from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import '../LandingStyles/Header.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useGetConversationsQuery, useGetUnreadCountQuery } from '../store/store/api/MessagingApi';

const Header = ({ searchValue, onSearchChange, onImageResults }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const toggleSearch = useCallback(() => setSearchVisible((v) => !v), []);
  const [uploading, setUploading] = useReactState(false);
  const toggleModal = useCallback((modalName) => {
    setActiveModal((curr) => (curr === modalName ? null : modalName));
  }, []);
  const closeModals = useCallback(() => setActiveModal(null), []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
    setTimeout(() => window.location.reload(), 0);
  }, [navigate]);

  // Current user display name (from token snapshot in localStorage)
  const stored = JSON.parse(localStorage.getItem('user') || 'null');
  const userInfo = stored?.token?.user;
  const displayName = userInfo ? `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim() : 'Account';
  const initials = (userInfo?.first_name?.[0] || '') + (userInfo?.last_name?.[0] || '');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeModals();
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') closeModals();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeModals]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const { data: conversations } = useGetConversationsQuery();
  const { data: unread } = useGetUnreadCountQuery();

  return (
    <header className="enhanced-header" ref={headerRef}>
      <div className="enhanced-header__content">
        <div className="enhanced-header__logo">
          <NavLink to="/landingpage" className="enhanced-header__logo-link" aria-label="Snapshop Home">
            <span className="enhanced-header__logo-text">Snapshop</span>
          </NavLink>
        </div>

        <div className="enhanced-header__search-container">
          <button
            type="button"
            className="enhanced-header__search-icon"
            onClick={toggleSearch}
            aria-expanded={searchVisible}
            aria-controls="header-search-input"
            aria-label="Toggle search"
          >
            <FaSearch />
          </button>
          {searchVisible && (
            <div className="enhanced-header__search-bar-wrapper">
              <input
                id="header-search-input"
                type="text"
                placeholder="Search products, categories..."
                className="enhanced-header__search-bar"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
              <label className="enhanced-header__camera-button" title="Search by image">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || uploading) return;
                    try {
                      setUploading(true);
                      const fd = new FormData();
                      fd.append('image', file);
                      const base = import.meta.env.VITE_BACKEND_API_URL;
                      const res = await fetch(`${base}api/image-search/`, { method: 'POST', body: fd });
                      const json = await res.json();
                      if (Array.isArray(json.results)) {
                        onImageResults?.(json.results);
                        // Optionally hide search after results
                        setSearchVisible(false);
                      }
                    } catch (_) {
                      // noop
                    } finally {
                      setUploading(false);
                      e.target.value = '';
                    }
                  }}
                />
                <FaCamera />
              </label>
            </div>
          )}
        </div>

        <div className="enhanced-header__icons">
          {isMobile && (
            <div className="enhanced-header__icon">
              <button
                type="button"
                className="enhanced-header__icon-button"
                onClick={() => toggleModal('menu')}
                aria-expanded={activeModal === 'menu'}
                aria-controls="header-menu-modal"
                aria-label="Open menu"
              >
                <FaBars />
              </button>
              {activeModal === 'menu' && (
                <div id="header-menu-modal" className="enhanced-header__modal enhanced-header__menu-modal" role="menu">
                  <h3 className="enhanced-header__modal-title">Navigation</h3>
                  <ul>
                    <li><NavLink to="/landingpage" onClick={closeModals}>Home</NavLink></li>
                    <li><NavLink to="/articles-sold" onClick={closeModals}>Articles Sold</NavLink></li>
                    <li><NavLink to="/articles-bought" onClick={closeModals}>Articles Bought</NavLink></li>
                    <li><NavLink to="/wishlist" onClick={closeModals}>Wishlist</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeModals}>Contact</NavLink></li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="enhanced-header__icon">
            <button
              type="button"
              className="enhanced-header__icon-button"
              onClick={() => toggleModal('messages')}
              aria-expanded={activeModal === 'messages'}
              aria-controls="header-messages-modal"
              aria-label="Open messages"
            >
              <FaEnvelope />
              {!!unread?.unread && <span className="enhanced-header__badge">{unread.unread}</span>}
            </button>
            {activeModal === 'messages' && (
              <div id="header-messages-modal" className="enhanced-header__modal enhanced-header__messages-modal">
                <h3 className="enhanced-header__modal-title">Messages</h3>
                <ul className="enhanced-header__messages-list">
                  {conversations?.length ? (
                    conversations.map((c) => (
                      <li
                        key={c.id}
                        className="enhanced-header__message-thread"
                        onClick={() => {
                          closeModals();
                          navigate(`/messages/${c.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="enhanced-header__thread-title">
                          <span>{c.product ? c.product.name : 'Direct chat'}</span>
                          {c.unread_count > 0 && <span className="enhanced-header__badge enhanced-header__badge--small">{c.unread_count}</span>}
                        </div>
                        {c.last_message ? (
                          <div className="enhanced-header__thread-preview">
                            <span className="enhanced-header__sender">{c.last_message.sender?.first_name || c.last_message.sender?.username}</span>
                            <span className="enhanced-header__snippet">: {c.last_message.content}</span>
                          </div>
                        ) : (
                          <div className="enhanced-header__thread-preview enhanced-header__thread-preview--empty">No messages yet</div>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="enhanced-header__empty-state"><p>No messages</p></li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="enhanced-header__icon">
            <button
              type="button"
              className="enhanced-header__icon-button"
              onClick={() => toggleModal('notifications')}
              aria-expanded={activeModal === 'notifications'}
              aria-controls="header-notifications-modal"
              aria-label="Open notifications"
            >
              <FaBell />
            </button>
            {activeModal === 'notifications' && (
              <div id="header-notifications-modal" className="enhanced-header__modal enhanced-header__notifications-modal">
                <h3 className="enhanced-header__modal-title">Notifications</h3>
                <ul className="enhanced-header__notifications-list">
                  {conversations?.filter((c) => c.unread_count > 0).length ? (
                    conversations
                      .filter((c) => c.unread_count > 0)
                      .map((c) => (
                        <li
                          key={c.id}
                          className="enhanced-header__notification-item"
                          onClick={() => {
                            closeModals();
                            navigate(`/messages/${c.id}`);
                          }}
                        >
                          <FaBell className="enhanced-header__notification-icon" />
                          <div className="enhanced-header__notification-content">
                            <div className="enhanced-header__notification-title">{c.product ? c.product.name : 'New message'}</div>
                            {c.last_message && (
                              <p className="enhanced-header__notification-text">
                                {c.last_message.sender?.first_name || c.last_message.sender?.username}: {c.last_message.content}
                              </p>
                            )}
                          </div>
                        </li>
                      ))
                  ) : (
                    <li className="enhanced-header__empty-state">
                      <FaBell className="enhanced-header__notification-icon" />
                      <p>No notifications</p>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="enhanced-header__icon">
            <button
              type="button"
              className="enhanced-header__icon-button"
              onClick={() => toggleModal('user')}
              aria-expanded={activeModal === 'user'}
              aria-controls="header-user-modal"
              aria-label="Open user menu"
            >
              <FaUser />
            </button>
            {activeModal === 'user' && (
              <div id="header-user-modal" className="enhanced-header__modal enhanced-header__user-modal">
                <div className="enhanced-header__user-info">
                  <div className="enhanced-header__avatar" aria-hidden="true">
                    {initials || <FaUser />}
                  </div>
                  <p className="enhanced-header__user-name">{displayName || 'Account'}</p>
                  <Link to="/profile" className="enhanced-header__profile-link" onClick={closeModals}>
                    <button type="button" className="enhanced-header__user-button">
                      <FaUser /> See Profile
                    </button>
                  </Link>
                  <button 
                    type="button" 
                    className="enhanced-header__user-button enhanced-header__user-button--logout" 
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
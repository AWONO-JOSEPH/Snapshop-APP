import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaBars, FaEnvelope, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../LandingStyles/Header.css';
// import ProfilePage from '/Users/klinch/Desktop/Snapshop/src/pages/Profile';
import { Link } from 'react-router-dom';

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const headerRef = useRef(null);

    const toggleSearch = () => setSearchVisible(!searchVisible);
    const toggleModal = (modalName) => {
        setActiveModal(activeModal === modalName ? null : modalName);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setActiveModal(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderModal = (modalName) => {
        if (activeModal !== modalName) return null;

        switch (modalName) {
            case 'menu':
                return (
                    <div className="header__modal header__menu-modal">
                        <ul>
                            <li>Home</li>
                            <li>Shop</li>
                            <li>About</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                );
            case 'messages':
                return (
                    <div className="header__modal header__messages-modal">
                        <h3>Messages</h3>
                        <ul>
                            <li>
                                <img src="/api/placeholder/40/40" alt="User 1" />
                                <div>
                                    <strong>User 1</strong>
                                    <p>Hello, how are you?</p>
                                </div>
                            </li>
                            <li>
                                <img src="/api/placeholder/40/40" alt="User 2" />
                                <div>
                                    <strong>User 2</strong>
                                    <p>Can you help me with...</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="header__modal header__notifications-modal">
                        <h3>Notifications</h3>
                        <ul>
                            <li>
                                <FaBell />
                                <p>New product available!</p>
                            </li>
                            <li>
                                <FaBell />
                                <p>Your order has been shipped.</p>
                            </li>
                        </ul>
                    </div>
                );
            case 'user':
                return (
                    <div className="header__modal header__user-modal">
                        <div className="header__user-info">
                            <img src="/api/placeholder/50/50" alt="User" />
                            <p>Username</p>
                            <Link to={'/profile'} className='w-full' >
                            <button type='button'><FaUser /> See Profile</button>
                            </Link>
                           
                            <button onClick={() => {}}><FaSignOutAlt /> Logout</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <header className="header" ref={headerRef}>
            <div className="header__content">
                <div className="header__logo">Snapshop</div>

                <div className="header__search-container">
                    <div className="header__search-icon" onClick={toggleSearch}>
                        <FaSearch />
                    </div>
                    {searchVisible && (
                        <input type="text" placeholder="Search..." className="header__search-bar" />
                    )}
                </div>

                <div className="header__icons">
                    <div className="header__icon" onClick={() => toggleModal('menu')}>
                        <FaBars />
                        {renderModal('menu')}
                    </div>

                    <div className="header__icon" onClick={() => toggleModal('messages')}>
                        <FaEnvelope />
                        {renderModal('messages')}
                    </div>

                    <div className="header__icon" onClick={() => toggleModal('notifications')}>
                        <FaBell />
                        {renderModal('notifications')}
                    </div>

                    <div className="header__icon" onClick={() => toggleModal('user')}>
                        <FaUser />
                        {renderModal('user')}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
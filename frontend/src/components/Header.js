import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn, activeView, goToPage }) => {
   
    const navItems = [
        { path: '/tecnicalsupport', label: 'Technical support', viewName: 'tecnicalsupport' },
        { path: '/courses', label: 'All courses', viewName: 'courses' }, 
        { path: '/payment', label: 'Payment', viewName: 'payment' },
    ];

    const isActive = (viewName) => {
        return activeView === viewName;
    }

    const handleNavClick = (viewName) => {
        goToPage(viewName);
    };

    return (
        <header className="header"> 
          
            <Link to="/" className="site-name-link" onClick={() => handleNavClick('home')}>Site name</Link>
            
            <nav className="nav">
                {navItems.map(item => (
                    <Link 
                        key={item.path}
                        to={item.path} 
                        className={`nav-link ${isActive(item.viewName) ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.viewName)}
                    >
                        {item.label}
                    </Link>
                ))}

                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="nav-link profile-link" onClick={() => handleNavClick('profile')}>Profile</Link>
                        <button className="nav-button btn-logout" onClick={() => goToPage('logout')}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login" 
                            className={`nav-link btn-login ${activeView === 'login' ? 'active' : ''}`}
                            onClick={() => handleNavClick('login')}
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className={`nav-link btn-signup ${activeView === 'register' ? 'active' : ''}`}
                            onClick={() => handleNavClick('register')}
                        >
                            Sign-Up
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    activeView: PropTypes.string.isRequired,
    goToPage: PropTypes.func.isRequired, 
};

export default Header;
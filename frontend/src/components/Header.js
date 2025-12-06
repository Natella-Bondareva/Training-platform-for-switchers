import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ activeView, goToPage }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role') || '');

    useEffect(() => {
        const onAuthChange = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
            setRole(localStorage.getItem('role') || '');
        };

        window.addEventListener('authChange', onAuthChange);
        return () => window.removeEventListener('authChange', onAuthChange);
    }, []);

    const navItems = [
        { path: '/tecnicalsupport', label: 'Technical support', viewName: 'tecnicalsupport' },
        { path: '/courses', label: 'All courses', viewName: 'courses' }, 
        { path: '/payment', label: 'Payment', viewName: 'payment' },
    ];

    const isActive = (viewName) => activeView === viewName;

    const handleNavClick = (viewName) => {
        goToPage && goToPage(viewName);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setRole('');
        // notify others
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
        goToPage && goToPage('logout');
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
                        <button className="nav-button btn-logout" onClick={handleLogout}>Logout</button>
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
    activeView: PropTypes.string.isRequired,
    goToPage: PropTypes.func.isRequired, 
};

export default Header;
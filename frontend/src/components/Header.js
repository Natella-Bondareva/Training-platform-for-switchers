import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ activeView, goToPage }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role') || '');

    console.log('[Header] Initial render - isLoggedIn:', isLoggedIn, 'role:', role);

    useEffect(() => {
        const onAuthChange = () => {
            const token = localStorage.getItem('token');
            const savedRole = localStorage.getItem('role') || '';
            console.log('[Header] authChange event - token exists:', !!token, 'role:', savedRole);
            setIsLoggedIn(!!token);
            setRole(savedRole);
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
                        {role === 'Admin' && (
                            <Link to="/create-course" className="nav-link btn-create-course" onClick={() => handleNavClick('create-course')}>
                                Create Course
                            </Link>
                        )}
                        {role === 'Mentor' && (
                            <Link to="/my-courses" className="nav-link btn-my-courses" onClick={() => handleNavClick('my-courses')}>
                                My Courses
                            </Link>
                        )}
                        <Link to={`/profile/${localStorage.getItem('userId')}`} className="nav-link profile-link" onClick={() => handleNavClick('profile')}>Profile</Link>
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
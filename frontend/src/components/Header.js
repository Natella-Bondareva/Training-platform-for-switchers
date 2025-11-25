import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn, activeView, goToPage }) => {
    // Всі основні навігаційні посилання
    const navItems = [
        { to: 'support', label: 'Technical support' },
        { to: '/all-courses', label: 'All courses' }, // Це посилання залишаємо як Link до окремої сторінки
        { to: 'payment', label: 'Payment' },
    ];

    // Функція, яка перевіряє, чи активна поточна кнопка
    const isActive = (viewName) => {
        if (viewName === 'support') return activeView === 'support' || activeView === 'details';
        if (viewName === 'payment') return activeView === 'payment' || activeView === 'checkout';
        return false;
    }

    return (
        // Враховуємо, що ви використовуєте class="header" у стилях
        <header className="header"> 
            <a href="/" className="site-name-link">Site name</a>
            
            <nav className="nav">
                {/* 1. Основні навігаційні кнопки/посилання */}
                {navItems.map(item => (
                    <React.Fragment key={item.to}>
                        {/* Якщо це Technical Support або Payment - робимо кнопками для перемикання стану */}
                        {(item.to === 'support' || item.to === 'payment') ? (
                            <button 
                                className={`nav-button ${isActive(item.to) ? 'active' : ''}`}
                                onClick={() => goToPage(item.to)}
                            >
                                {item.label}
                            </button>
                        ) : (
                            // All Courses як звичайне Link
                            <Link to={item.to} className="nav-link">{item.label}</Link>
                        )}
                    </React.Fragment>
                ))}

                {/* 2. УМОВНИЙ РЕНДЕРИНГ: Дії користувача */}
                {isLoggedIn ? (
                    // Стан: Зареєстрований
                    <>
                        <Link to="/profile" className="nav-link profile-link">Profile</Link>
                        <button className="nav-button btn-logout" onClick={() => goToPage('logout')}>Logout</button>
                    </>
                ) : (
                    // Стан: Не зареєстрований
                    <>
                        <button className="nav-button btn-login" onClick={() => goToPage('login')}>Login</button>
                        <button className="nav-button btn-signup" onClick={() => goToPage('signup')}>Sign-Up</button>
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
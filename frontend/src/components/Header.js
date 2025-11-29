import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn, activeView, goToPage }) => {
    
    // ОНОВЛЕНО: Використовуйте правильні шляхи, як у App.js, і додайте '/' на початку
    const navItems = [
        // Змінено 'support' на '/tecnicalsupport'
        { path: '/tecnicalsupport', label: 'Technical support', viewName: 'tecnicalsupport' },
        // Змінено '/all-courses' на '/courses'
        { path: '/courses', label: 'All courses', viewName: 'courses' }, 
        // Змінено 'payment' на '/payment'
        { path: '/payment', label: 'Payment', viewName: 'payment' },
    ];

    // Функція для визначення активності (використовуємо activeView, якщо це необхідно для стилізації)
    const isActive = (viewName) => {
        // Я спростив логіку активності, оскільки тепер вона залежить від маршруту, 
        // але залишив вашу логіку activeView для підтримки поточного стану
        return activeView === viewName;
    }
    
    // Функція-обгортка, яка викликає goToPage І дозволяє Link перейти
    const handleNavClick = (viewName) => {
        // Ми все одно викликаємо вашу функцію goToPage для оновлення стану activeView
        goToPage(viewName);
    };

    return (
        <header className="header"> 
            
            {/* 1. ВИПРАВЛЕНО: Використовуємо Link для повернення на Головну */}
            <Link to="/" className="site-name-link" onClick={() => handleNavClick('home')}>Site name</Link>
            
            <nav className="nav">
                {navItems.map(item => (
                    // ВИПРАВЛЕНО: Використовуємо Link для всіх навігаційних елементів
                    <Link 
                        key={item.path}
                        to={item.path} 
                        className={`nav-link ${isActive(item.viewName) ? 'active' : ''}`}
                        // Викликаємо handleNavClick для оновлення activeView у App.js
                        onClick={() => handleNavClick(item.viewName)}
                    >
                        {item.label}
                    </Link>
                ))}

                {/* 2. УМОВНИЙ РЕНДЕРИНГ: Дії користувача */}
                {isLoggedIn ? (
                    // Стан: Зареєстрований
                    <>
                        {/* Припускаємо, що /profile також є маршрутом */}
                        <Link to="/profile" className="nav-link profile-link" onClick={() => handleNavClick('profile')}>Profile</Link>
                        {/* Logout залишається кнопкою, оскільки він лише змінює стан, а не переходить на новий маршрут */}
                        <button className="nav-button btn-logout" onClick={() => goToPage('logout')}>Logout</button>
                    </>
                ) : (
                    // Стан: Не зареєстрований
                    <>
                        {/* ВИПРАВЛЕНО: Використовуємо Link для login/register, оскільки вони мають маршрути */}
                        <Link 
                            to="/login" 
                            className={`nav-link btn-login ${activeView === 'login' ? 'active' : ''}`}
                            onClick={() => handleNavClick('login')}
                        >
                            Login
                        </Link>
                        {/* Припускаємо, що 'signup' повинен вести на /register */}
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
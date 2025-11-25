import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TechnicalSupportPage.css';

const Header = ({ activeView, goToPage }) => (
    <header className="header">
        <a href="/" className="site-name-link">Site name</a>
        <nav className="nav">
            {/* 1. Кнопка Technical support */}
            <button 
                className={`nav-button ${activeView === 'support' || activeView === 'details' ? 'active' : 'nav-link'}`}
                onClick={() => goToPage('support')}
            >
                Technical support
            </button>
            
            <a href="/all-courses" className="nav-link">All courses</a>
            
            {/* 2. Кнопка Payment */}
            <button 
                className={`nav-button ${activeView === 'payment' ? 'active' : 'nav-link'}`}
                onClick={() => goToPage('payment')} 
            >
                Payment
            </button>
            <a href="/profile" className="nav-link">Profile</a>
        </nav>
    </header>
);

Header.propTypes = {
    activeView: PropTypes.string.isRequired,
    goToPage: PropTypes.func.isRequired, 
};

const Footer = () => (
    <footer className="footer">
        <div className="footer-left">
            <a href="/" className="site-name-footer-link">Site name</a>
            <a 
                href="https://discord.gg/Abu7vkFd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="discord-link"
            >
                <svg viewBox="0 0 640 512" className="discord-icon-svg">
                    <path d="M524.531,6.093c-28.532-3.159-58.46,4.083-84.62,20.081-30.822,18.841-55.602,46.062-73.696,78.14-7.468,13.376-28.434,42.5-30.73,45.184-7.917,9.378-15.548,22.062-23.364,36.568-1.579,2.946-4.664,5.496-6.425,7.766-4.322,5.52-9.626,11.532-15.422,18.067-11.831,13.256-25.02,28.756-39.756,46.331-4.708,5.658-10.155,11.751-16.142,18.423-11.378,12.7-24.162,27.132-38.337,43.209-17.766,19.988-37.47,42.162-58.118,65.922-26.65,30.347-56.126,59.387-87.412,85.253-15.592,12.871-33.195,21.841-52.545,26.757-12.724,3.176-25.808,4.721-39.02,4.636-12.285-.083-24.87-1.748-37.264-4.887-14.283-3.647-28.182-9.61-41.248-18.077-10.822-7.05-20.941-15.656-30.137-25.922-12.356-13.882-22.956-30.082-31.543-48.452-8.312-17.979-14.502-37.587-18.337-57.995-3.858-20.598-5.323-41.678-4.394-62.771.554-12.553,2.449-24.87,5.694-36.931,2.029-7.51,5.334-15.118,10.038-22.759,2.779-4.526,6.721-9.11,12.067-13.79,15.77-13.91,37.388-26.963,64.846-39.957,8.216-3.881,17.41-7.23,27.05-10.024,11.192-3.238,22.842-5.719,34.808-7.304,11.666-1.549,23.513-1.61,35.348-.182,14.653,1.758,28.691,5.432,41.972,11.082,10.978,4.704,21.782,10.74,31.782,18.074,13.366,9.663,25.684,21.259,36.431,34.821,21.319,26.784,40.485,58.747,56.786,94.394-18.335,38.991-32.768,79.914-43.344,121.731-9.67,38.358-16.541,77.561-19.988,117.447-3.488,40.165-3.957,80.73-1.385,121.082-2.18,34.786-8.916,68.995-18.748,102.732-23.71,78.964-67.973,149.743-131.792,207.262-30.824,27.536-64.814,50.75-101.996,69.516-16.89,8.448-34.509,15.681-53.111,21.674-12.585,4.03-25.596,7.206-38.91,9.453-15.547,2.684-31.11,3.992-46.685,4.018-18.257,0-36.577-1.34-54.673-4.013-16.14-2.433-31.956-6.425-47.378-11.854-12.44-4.38-24.636-9.972-36.291-16.634-10.999-6.28-21.644-13.689-31.722-22.094-11.675-9.845-22.613-21.493-32.616-34.792-15.394-20.244-28.718-42.345-39.79-65.738-16.294-34.426-27.182-70.932-32.329-108.619-5.187-37.957-3.618-76.381,4.722-114.777,4.406-20.147-11.537-40.061-21.056-59.578-11.752-24.471-25.86-48.163-42.483-71.196-17.417-23.754-37.337-45.717-59.988-64.673-31.706-26.65-66.368-47.018-103.882-60.672-16.594-5.918-33.72-10.457-51.523-13.633-12.488-2.272-25.106-3.791-37.807-4.526-12.723-.746-25.46-1.399-38.162-1.998-13.796-.653-27.596-1.579-41.258-3.085-27.15-3.003-54.664-7.98-81.428-14.945C524.444,6.095,524.487,6.094,524.531,6.093z"/>
                </svg>
            </a>
        </div>
        <div className="footer-links-container">
            {['Topic 1', 'Topic 2', 'Topic 3'].map((topicName) => (
                <div key={topicName} className="footer-topic-column">
                    <div className="footer-topic-title">Topic</div>
                    {[1, 2, 3].map((pageNum) => (
                        <a key={pageNum} href={`/page-${pageNum}-${topicName.replace(' ', '-').toLowerCase()}`} className="footer-page-link">Page</a>
                    ))}
                </div>
            ))}
        </div>
    </footer>
);

// --- КОМПОНЕНТ СТОРІНКИ ОПЛАТИ ---
// (Тут має бути PaymentPage.jsx, я залишаю його для повноти)
const PaymentPage = ({ goToPage, activeView }) => {
    return (
        <div className="page-container">
            <Header activeView={activeView} goToPage={goToPage} /> 
            
            <main className="main-content payment-content">
                <h2 className="payment-page-title">(Site name) Plus</h2>
                
                <div className="payment-card-container">
                    <h3 className="price-tag">$50 per month</h3>
                    <ul className="benefits-list">
                        <li><span className="check-icon">✓</span> Full access to the course</li>
                        <li><span className="check-icon">✓</span> Priority for technical support</li>
                        <li><span className="check-icon">✓</span> Official certificate</li>
                    </ul>
                    <button className="payment-button">Payment</button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export {PaymentPage};


PaymentPage.propTypes = {
    goToPage: PropTypes.func.isRequired,
    activeView: PropTypes.string.isRequired,
};

// ... (RequestDetailPage)
const RequestDetailPage = ({ requestData, goToPage, activeView }) => {
    return (
        <div className="page-container">
            <Header activeView={activeView} goToPage={goToPage} /> 
            
            <main className="main-content detail-page">
                <div className="detail-header-row">
                    <h1>Technical support</h1>
                    <div className="request-status">Status: {requestData.status}</div>
                    <h2 className="request-title">{requestData.contactReason}</h2>
                </div>
                <div className="request-details-grid">
                    <div className="detail-block-wrapper">
                        <h3 className="box-title">Problem</h3>
                        <div className="detail-box problem-box">
                            <p className="box-content">{requestData.problemDescription}</p>
                        </div>
                    </div>
                    <div className="detail-block-wrapper">
                        <h3 className="box-title">Technical support response</h3>
                        <div className="detail-box response-box">
                            <p className="box-content">{requestData.response}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
RequestDetailPage.propTypes = {
    goToPage: PropTypes.func.isRequired,
    activeView: PropTypes.string.isRequired,
    requestData: PropTypes.shape({
        contactReason: PropTypes.string.isRequired, 
        problemDescription: PropTypes.string.isRequired, 
        status: PropTypes.string.isRequired,
        response: PropTypes.string.isRequired,
    }).isRequired,
};

// --- ОСНОВНИЙ КОМПОНЕНТ ФОРМИ ТА КОНТРОЛЕР ---

const TechnicalSupportPageForm = ({ goToPage, activeView }) => {
    const [contactReason, setContactReason] = useState('');
    const [problemDescription, setProblemDescription] = useState('');

    const handleSend = () => {
        if (contactReason.trim() === '' || problemDescription.trim() === '') {
            alert('Будь ласка, заповніть обидва поля: Причина звернення та Опис проблеми.');
            return;
        }
        
        const newRequest = {
            id: Date.now(),
            contactReason: contactReason, 
            status: 'being resolved',
            problemDescription: problemDescription, 
            response: '',
        };
        
        // Зберігаємо дані та переходимо на сторінку деталей
        goToPage('details', newRequest);
    };
    
    return (
        <div className="page-container">
            <Header activeView={activeView} goToPage={goToPage} /> 
            <main className="main-content">
                <h1>Technical support</h1>
                <p className="support-prompt">Contact Reason</p>
                <div className="search-form">
                    <input 
                        type="text" 
                        placeholder="" 
                        className="search-input"
                        value={contactReason}
                        onChange={(e) => setContactReason(e.target.value)}
                    />
                </div>
                <p className="support-prompt">What can we help you with?</p>
                <div className="search-form">
                    <input 
                        type="text" 
                        placeholder="" 
                        className="search-input"
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                    />
                    <button className="send-button" onClick={handleSend}>Send</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export {TechnicalSupportPageForm};

TechnicalSupportPageForm.propTypes = {
    goToPage: PropTypes.func.isRequired,
    activeView: PropTypes.string.isRequired,
};

// --- ГОЛОВНИЙ КОНТРОЛЕР (для файлу App.jsx) ---
// Якщо ви використовуєте TechnicalSupportPage.jsx як App.jsx
const MainAppController = () => {
    const [activeView, setActiveView] = useState('support'); 
    const [requestData, setRequestData] = useState(null);

    const goToPage = (viewName, data = null) => {
        if (viewName === 'details' && data) {
            setRequestData(data);
        }
        if (viewName === 'support') {
            setRequestData(null);
        }
        setActiveView(viewName);
    };

    if (activeView === 'payment') {
        return <PaymentPage goToPage={goToPage} activeView={activeView} />;
    }
    
    if (activeView === 'details' && requestData) {
        return <RequestDetailPage requestData={requestData} goToPage={goToPage} activeView={activeView} />;
    }

    return (
        <TechnicalSupportPageForm 
            goToPage={goToPage} 
            activeView={activeView} 
        />
    );
};

export default MainAppController;
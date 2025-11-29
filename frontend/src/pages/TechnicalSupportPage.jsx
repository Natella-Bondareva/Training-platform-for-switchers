import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RequestDetailPage from './RequestDetailPage';
import '../styles/TechnicalSupportPage.css';

// --- Форма для створення звернення ---
const TechnicalSupportPageForm = ({ goToDetails }) => {
    const [contactReason, setContactReason] = useState('');
    const [problemDescription, setProblemDescription] = useState('');

    const handleSend = () => {
        if (contactReason.trim() === '' || problemDescription.trim() === '') {
            alert('Будь ласка, заповніть обидва поля: Причина звернення та Опис проблеми.');
            return;
        }

        const newRequest = {
            id: Date.now(),
            contactReason,
            problemDescription,
            status: 'being resolved',
            response: ''
        };

        goToDetails(newRequest);
    };

    return (
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
    );
};

TechnicalSupportPageForm.propTypes = {
    goToDetails: PropTypes.func.isRequired,
};

// --- Основний компонент сторінки техпідтримки ---
const TechnicalSupportPage = () => {
    const [view, setView] = useState('form'); // 'form' | 'details'
    const [requestData, setRequestData] = useState(null);

    const goToDetails = (data) => {
        setRequestData(data);
        setView('details');
    };

    const goBackToForm = () => {
        setRequestData(null);
        setView('form');
    };

    return view === 'details' && requestData ? (
        <RequestDetailPage requestData={requestData} goBack={goBackToForm} />
    ) : (
        <TechnicalSupportPageForm goToDetails={goToDetails} />
    );
};

export default TechnicalSupportPage;

import React from 'react';
import '../styles/TechnicalSupportPage.css';

const PaymentPage = () => {
    return (
        <main className="main-content payment-content">
            <h2 className="payment-page-title">(Site name) Plus</h2>
            <div className="payment-card-container">
                <h3 className="price-tag">$50 per month</h3>
                <ul className="benefits-list">
                    <li><span className="check-icon">✓</span> Full access to the course</li>
                    <li><span className="check-icon">✓</span> Priority for technical support</li>
                    <li><span className="check-icon">✓</span> Official certificate</li>
                </ul>
                <button className="payment-button">Pay Now</button>
            </div>
        </main>
    );
};

export default PaymentPage;

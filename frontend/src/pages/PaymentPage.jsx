import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';

const PaymentPage = () => 
{
    const navigate = useNavigate(); 
    const handlePaymentClick = () => {navigate('/payment2')};

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

                <button className="payment-button"onClick={handlePaymentClick}>Pay Now
                </button>
            </div>
        </main>
    );
};

export default PaymentPage;

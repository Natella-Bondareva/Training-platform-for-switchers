import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TechnicalSupportPage.css';

const RequestDetailPage = ({ requestData }) => {
    return (
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
                        <p className="box-content">{requestData.response || 'Очікуємо відповіді від тех. підтримки.'}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

RequestDetailPage.propTypes = {
    requestData: PropTypes.shape({
        contactReason: PropTypes.string.isRequired,
        problemDescription: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        response: PropTypes.string,
    }).isRequired,
};

export default RequestDetailPage;

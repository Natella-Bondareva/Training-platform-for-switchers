import React from 'react';
import './Footer.css';

export const Footer = () => {
    return (
        <footer>
            <div className="footer-content-container">
                <div className="footer-row footer-top-row">
                    <div className="site-info-col">
                        <div className="site-logo-name">
                            <span className="logo-icon"></span>
                            <span className="site-name">Site name</span>
                        </div>
                    </div>
                    
                    <div className="footer-links-group">
                        {['Topic', 'Topic', 'Topic'].map((topic, index) => (
                            <div key={index} className="footer-link-col">
                                <h4>{topic}</h4>
                                <ul>
                                    <li><a href="#">Page</a></li>
                                    <li><a href="#">Page</a></li>
                                    <li><a href="#">Page</a></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
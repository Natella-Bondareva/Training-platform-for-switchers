import React from 'react';
import './Footer.css';
import discordIcon from '../images/discordimage.jpeg';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <a href="/" className="site-name-footer-link">Site name</a>

                <a 
                    href="https://discord.gg/UhvRpuc9Jp" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="discord-link"
                >
                    <img 
                        src={discordIcon} 
                        alt="Discord" 
                        className="discord-icon-img"
                    />
                </a>
            </div>

            <div className="footer-links-container">
                {['Topic 1', 'Topic 2', 'Topic 3'].map((topicName) => (
                    <div key={topicName} className="footer-topic-column">
                        <div className="footer-topic-title">Topic</div>
                        {[1, 2, 3].map((pageNum) => (
                            <a 
                                key={pageNum} 
                                href={`/page-${pageNum}-${topicName.replace(' ', '-').toLowerCase()}`} 
                                className="footer-page-link"
                            >
                                Page
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </footer>
    );
};

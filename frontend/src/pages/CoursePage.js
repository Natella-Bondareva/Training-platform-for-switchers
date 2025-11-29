import React from 'react';
import { Footer } from '../components/Footer'; 
import { Link } from 'react-router-dom';
import '../styles/CoursePage.css'; 


const CourseDetailsContent = () => (
    <section className="course-details-section">
        <div className="course-main-content">
            <div className="course-header">
                <h1>IBM</h1>
                <h2>Specialization Building AI Agents and Agentic Workflows</h2>
            </div>
            
            <div className="course-info-grid">
                <div className="info-box skills-box">
                    <h4>Skills required</h4>
                    <div className="skill-tags-list">
                        <span className="skill-tag">React.js</span>
                        <span className="skill-tag">Data Science</span>
                        <span className="skill-tag">Python / Programming</span>
                        <span className="skill-tag">Application Design</span>
                        <span className="skill-tag">English B2</span>
                        <span className="skill-tag">HTML / CSS</span>
                        <span className="skill-tag">AI understanding</span>
                        <span className="skill-tag">Design</span>
                    </div>
                </div>

                <div className="info-box included-box">
                    <h4>What is included in the program?</h4>
                    <ul className="included-list">
                        <li>✅ <strong>Certificate:</strong> Professional IBM Certificate upon completion.</li>
                        <li>📚 <strong>Modules:</strong> 5 specialized modules.</li>
                        <li>🎙️ <strong>Lectures:</strong> 35 video lectures (Total 15 hours).</li>
                        <li>✍️ <strong>Quizzes & Tasks:</strong> 10 graded assignments and 5 quizzes.</li>
                        <li>💻 <strong>Software:</strong> Access to IBM Cloud tools and APIs.</li>
                    </ul>

                    <div className="time-details">
                        <p><strong>Total time:</strong> 40 hours</p>
                        <p><strong>Language:</strong> English (subtitles available)</p>
                    </div>
                </div>
            </div>

            <div className="learn-section">
                <h3>What you will learn</h3>
                <ul>
                    <li>Orchestrate agentic multi-agent systems with CrewAI for collaboration, coordination, and parallelism.</li>
                    <li>Build conversation-driven agents (AI assistants) with Bosshh and AGI.js, compare AI frameworks.</li>
                    <li>Design and implement agents that use memory, reasoning, and complex workflows.</li>
                    <li>Utilize LLMs like OpenAI GPT, Meta Llama, and IBM Granite in agent development.</li>
                </ul>
            </div>
            
            <div className="review-section">
                <h3>Review</h3>
                <p>
                    <strong>Introduction:</strong> This specialization is designed to teach you how to build the next generation of AI applications. You will learn to utilize LLMs (such as OpenAI GPT, Meta Llama, and IBM Granite) to develop agents that employ memory, reasoning, and complex workflows.
                </p>
                <p>
                    <strong>Program:</strong> The curriculum covers everything from basic concepts (tool configuration, memory management) to complex architectures (multi-agent systems, applications with knowledge graphs) and the use of tools like CrewAI.
                </p>
            </div>

        </div>
        
        <aside className="course-sidebar">
            <div className="join-card">
                <button className="btn btn-join">JOIN THE COURSE</button>
                <div className="course-status">
                    <span className="status-text">Starts 10 November '24</span>
                    <span className="status-number">24 / 40</span>
                </div>
            </div>
        </aside>
    </section>
);


export const CoursePage = () => {
    return (
        <div className="start-page-wrapper">
            <div className="content-background"> 
                <main className="main-content">
                    <CourseDetailsContent />
                </main>
            </div>
        </div>
    );
};
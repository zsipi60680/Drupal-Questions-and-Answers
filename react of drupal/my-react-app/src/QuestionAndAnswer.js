import React, { useEffect, useState } from 'react';
import './QuestionAndAnswer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function QaA() {
    const [response, setResponse] = useState([]);//fetched data.
    const [openIndex, setOpenIndex] = useState(null);//track which question is currently open.
    const [topics, setTopics] = useState([]);//list of topics
    const [currentTopic, setCurrentTopic] = useState('');//keep track of the selected topic.

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://my-site.ddev.site/question_and_answer1_json', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const sortedData = sortDataByOrder(data);
                setResponse(sortedData);
                getTopics(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //Removes HTML Tag from Answer
    const removeHtmlTags = (text) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const sortDataByOrder = (data) => {
        return data.sort((a, b) => a.field_order_value - b.field_order_value);
    };

    //Extracts unique topics from the fetched data.
    const getTopics = (data) => {
        let topicNow = [...new Set(data.map(item => removeHtmlTags(item.field_topic)))];
        setTopics(topicNow);
        setCurrentTopic(topicNow[0]);
    };

    const handleQuestionClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    //Renders tabs for each topic, setting the current topic when a tab is clicked.
    const renderTopics = () => (
        <div className="nav nav-tabs">
            {topics.map((topic, index) => (
                <a key={index} className={`nav-item nav-link ${topic === currentTopic ? 'active' : ''}`} onClick={() => setCurrentTopic(topic)} href="#">
                    {topic}
                </a>
            ))}
        </div>
    );

    //Renders rows for each question and answer. The answer row is conditionally shown based on whether the question is open.
    const renderTableRows = () => (
        response.map((item, index) => {
            if (removeHtmlTags(item.field_topic) === currentTopic) {
                return (
                    <React.Fragment key={index}>
                        <tr className="question-row mb-3" onClick={() => handleQuestionClick(index)}>
                            <td colSpan="2" className="bg-light text-primary">
                                <span className={`arrow ${openIndex === index ? 'open' : ''}`}>▼</span>
                                {item.field_questions}
                            </td>
                        </tr>
                        <tr className={`answer-row ${openIndex === index ? 'show' : ''}`}>
                            <td colSpan="2">
                                <div className="answer p-3">
                                    <div className="answer-box">
                                        {removeHtmlTags(item.field_answer)}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                );
            }
            return null;
        })
    );

    return (
        <div className="container">
            <h1 className="page-title">Questions and Answers</h1>
            {renderTopics()}
            <div className="table-container">
                <table className="table table-bordered table-hover">
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QaA;

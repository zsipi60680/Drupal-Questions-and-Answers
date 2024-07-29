import React, { useEffect, useState } from 'react';
import './QuestionAndAnswer.css'

function QaA() {
    const [response, setResponse] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState('');

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
                setResponse(data);
                getTopics(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const getTopics = (data) => {
        let topicNow = [...new Set(data.map(item => removeHtmlTags(item.field_topic)))];
        setTopics(topicNow);
        setCurrentTopic(topicNow[0]);
    };

    const handleQuestionClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const removeHtmlTags = (text) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const renderTopics = () => (
        <div className='topics-container'>
            {topics.map((topic, index) => (
                <div key={index} className={`topic ${topic === currentTopic ? 'current-topic' : ''}`} onClick={() => setCurrentTopic(topic)}>
                    <button className='button'>{topic}</button>
                </div>
            ))}
        </div>
    );

    const renderTableRows = () => (
        response.map((item, index) => {
            if (removeHtmlTags(item.field_topic) === currentTopic) {
                return (
                    <React.Fragment key={index}>
                        <tr className="question-row" onClick={() => handleQuestionClick(index)}>
                            <td colSpan="2">
                                <span className={`arrow ${openIndex === index ? 'open' : ''}`}> ▼ </span>
                                {item.field_questions}
                            </td>
                        </tr>
                        <tr className={`answer-row ${openIndex === index ? 'show' : ''}`}>
                            <td colSpan="2">
                                <div className="answer">
                                    {removeHtmlTags(item.field_answer)}
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                );
            }
        })
    );

    return (
        <div>
            <h1 className="page-title">Questions and Answers</h1>
            {renderTopics()}
            <div className="table-container">
                <table className="qa-table">
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QaA;


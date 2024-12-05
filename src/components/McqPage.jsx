import Question from "./Question"
import "./mcq.css"
import { getData } from './../constants'
import { useState } from 'react';

function McqPage() {
    
    const [showAnswers, setShowAnswers] = useState(false);
    const data = getData();

    const toggleAnswers = () => {
        setShowAnswers(!showAnswers);
    };
    return (
        <>
        <button onClick={toggleAnswers}>
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
            <ul className="question-list-container">
                {data.map((mcq, index) => {
                    return (
                        <Question
                            key={index}
                            index={index + 1}
                            question={mcq["question"]}
                            answer={mcq["answer"]}
                            options={mcq["options"]}
                            showAnswers={showAnswers}
                        />
                    )
                })}
            </ul>
        </>
    )
}

export default McqPage;
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { shuffleArray } from "../utils";

function Question({ question, options, answer, selectionRef, showAnswers }) {
  const [selectedOption, setSelectedOption] = useState();
  const ans = answer;

  // Store shuffled options in the state to prevent re-shuffling on every render
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Only shuffle options once when the component mounts
  useEffect(() => {
    const optionsArray = Object.entries(options).map(([key, value]) => ({ key, value }));
    setShuffledOptions(shuffleArray(optionsArray));
  }, [options]); // Dependency on options to shuffle only when they change

  const getStyle = (option) => {
    if (showAnswers) {
      return option.key === ans ? "bg-green" : "";
    }
    return `${(option.key === selectedOption) ? (option.key === ans ? "bg-green" : "bg-red") : ""}`;
  };

  const handleClick = (option) => {
    if (!showAnswers) {
      setSelectedOption(option.key);
      selectionRef.current = {
        ...selectionRef.current,
        index: option.key
      };
    }
  };

  return (
    <li className="question-container">
      <p className="question">{question}</p>
      <ol>
        {shuffledOptions.map((option, index) => (
          <li key={index} className={getStyle(option)} onClick={() => { handleClick(option) }}>
            {option.value}
          </li>
        ))}
      </ol>
    </li>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  answer: PropTypes.string.isRequired,
  selectionRef: PropTypes.object.isRequired,
  showAnswers: PropTypes.bool.isRequired,
};

export default Question;

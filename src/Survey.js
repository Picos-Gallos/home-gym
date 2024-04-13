import React, { useState } from 'react';

function Survey() {
    const [selectedChoice, setSelectedChoice] = useState(null);

    const question = "What is the capital of France?";
    const choices = ["Paris", "London", "Berlin", "Rome"];

    const handleChoiceSelection = (choiceIndex) => {
        setSelectedChoice(choiceIndex);
    };

    return (
        <div>
            <h3>{question}</h3>
            {choices.map((choice, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={`choice-${index}`}
                        name="choices"
                        value={choice}
                        checked={selectedChoice === index}
                        onChange={() => handleChoiceSelection(index)}
                    />
                    <label htmlFor={`choice-${index}`}>{choice}</label>
                </div>
            ))}
            <p>Selected choice: {selectedChoice !== null ? choices[selectedChoice] : 'None'}</p>
        </div>
    );
};

export default Survey;
import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./Firebase";
import { useNavigate } from "react-router-dom";

function Survey() {
  const [selectedChoices, setSelectedChoices] = useState({});
  const navigate = useNavigate();

  const questions = [
    {
      id: "fitnessLevel",
      text: "What is your fitness level?",
      choices: [
        "Never been to a gym",
        "Whenever I have time",
        "I go often, but not everyday",
        "I go everyday",
      ],
    },
    {
      id: "fitnessGoal",
      text: "What is your fitness goal?",
      choices: [
        "Gain endurance",
        "Gain strength",
        "Increase mobility",
        "General health",
      ],
    },
    {
      id: "budget",
      text: "What is your budget?",
      choices: ["Less than $50", "$50 - $100", "$100 - $200", "More than $200"],
    },
    {
      id: "schedule",
      text: "When do you prefer to work out?",
      choices: ["Morning", "Afternoon", "Evening", "Night"],
    },
    {
      id: "buddy",
      text: "Who do you prefer to work out with?",
      choices: ["Solo", "With a gym buddy", "Small group", "Fitness classes"],
    },
  ];

  const handleChoiceSelection = (questionId, choiceIndex) => {
    setSelectedChoices((prevChoices) => ({
      ...prevChoices,
      [questionId]: choiceIndex,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current user: ", auth.currentUser);
    console.log("Selected choices: ", selectedChoices);
    try {
        const log = await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: auth.currentUser.email,
            questions: [
              selectedChoices.fitnessLevel,
              selectedChoices.fitnessGoal,
              selectedChoices.budget,
              selectedChoices.schedule,
              selectedChoices.buddy
            ]
        });
        console.log("Survey submitted successfully!", log);
        navigate("/table");
    } catch (error) {
        console.error("Error submitting survey: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          {question.choices.map((choice, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`${question.id}-${index}`}
                name={question.id}
                value={choice}
                checked={selectedChoices[question.id] === index}
                onChange={() => handleChoiceSelection(question.id, index)}
              />
              <label htmlFor={`${question.id}-${index}`}>{choice}</label>
            </div>
          ))}
        </div>
      ))}
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Survey;

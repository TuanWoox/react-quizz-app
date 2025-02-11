function Options({ options, dispatch, answer, correctOption }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option 
            ${answer === index && "answer"}
            ${
              hasAnswer ? (index === correctOption ? "correct" : "wrong") : ""
            }`}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

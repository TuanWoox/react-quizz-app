import Options from "./Options";

function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />
    </div>
  );
}

export default Questions;

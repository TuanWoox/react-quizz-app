function ProgressBar({
  index,
  numQuestions,
  answer,
  scores,
  possibleHighestScores,
}) {
  const percentage = Math.ceil((scores / possibleHighestScores) * 100);
  return (
    <header className="progress">
      <progress
        value={answer ? index + 1 : index}
        max={numQuestions}
      ></progress>
      <p>
        {index + 1} / {numQuestions}
      </p>
      <p>
        {scores} / {possibleHighestScores} ({percentage} %)
      </p>
    </header>
  );
}

export default ProgressBar;

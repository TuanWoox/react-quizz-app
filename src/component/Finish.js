function Finish({ scores, possibleHighestScores, highscores }) {
  const percentage = Math.ceil((scores / possibleHighestScores) * 100);
  let emoji;

  if (percentage >= 90) {
    emoji = "🎉"; // Excellent
  } else if (percentage >= 70) {
    emoji = "😊"; // Good
  } else if (percentage >= 50) {
    emoji = "😐"; // Average
  } else {
    emoji = "😢"; // Needs improvement
  }

  return (
    <>
      <div className="result">
        <p>Congratulations on finishing the quiz!!!⭐</p>
        <p>
          Your result is: {scores} / {possibleHighestScores} ({percentage}%)
          {emoji}
        </p>
        <p>Your highest scores: {highscores}</p>
      </div>
    </>
  );
}

export default Finish;

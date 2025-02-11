function StartScreen({ dispatch }) {
  return (
    <div className="start">
      <h3>
        Welcome to the React Quizz App. The place where you can challenge your
        knowledge
      </h3>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Lets start!
      </button>
    </div>
  );
}

export default StartScreen;

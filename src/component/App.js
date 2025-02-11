import { useReducer, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import ButtonUI from "./ButtonUI";
import Finish from "./Finish";
import Timer from "./Timer";
import Footer from "./Footer";
const initialState = {
  questions: [],
  //fetch,error,ready,active,finish
  status: null,
  index: 0,
  answer: null,
  scores: 0,
  highscores: 0,
  secondsRemaining: null,
};

const SECS_PER_QUES = 30;
function reducer(state, action) {
  switch (action.type) {
    case "fetch":
      return { ...state, status: "fetch" };
    case "fetchFailed":
      return { ...state, status: "error" };
    case "setData":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUES,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        scores:
          question.correctOption === action.payload
            ? state.scores + question.points
            : state.scores,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuizz":
      return {
        ...state,
        answer: null,
        status: "finish",
        highscores:
          state.highscores < state.scores ? state.scores : state.highscores,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscores: state.highscores,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [
    { questions, status, index, answer, scores, highscores, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const possibleHighestScores = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );
  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/questions");
        dispatch({ type: "fetch" });
        const data = await response.json();
        dispatch({ type: "setData", payload: data });
      } catch (err) {
        dispatch({ type: "fetchFailed" });
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "fetch" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              numQuestions={numQuestions}
              possibleHighestScores={possibleHighestScores}
              scores={scores}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
              scores={scores}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              {answer !== null && index < numQuestions - 1 && (
                <ButtonUI
                  dispatchCall={() => {
                    dispatch({ type: "nextQuestion" });
                  }}
                >
                  Next Question
                </ButtonUI>
              )}
              {index === numQuestions - 1 && (
                <ButtonUI
                  dispatchCall={() => {
                    dispatch({ type: "finishQuizz" });
                  }}
                >
                  Finish
                </ButtonUI>
              )}
            </Footer>
          </>
        )}
        {status === "finish" && (
          <>
            <Finish
              scores={scores}
              possibleHighestScores={possibleHighestScores}
              highscores={highscores}
            />
            <ButtonUI
              dispatchCall={() => {
                dispatch({ type: "restart" });
              }}
            >
              Restart?
            </ButtonUI>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;

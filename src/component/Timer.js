import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const intervalId = setInterval(
        function () {
          dispatch({ type: "tick" });
        },
        [1000]
      );
      return () => {
        clearInterval(intervalId);
      };
    },
    [dispatch]
  );

  return (
    <button className="timer btn btn-ui">
      {minutes < 10 ? "0" : ""}
      {minutes} : {seconds < 10 ? "0" : ""}
      {seconds}
    </button>
  );
}

export default Timer;

function ButtonUI({ dispatchCall, children }) {
  return (
    <button className="btn btn-ui" onClick={dispatchCall}>
      {children}
    </button>
  );
}

export default ButtonUI;

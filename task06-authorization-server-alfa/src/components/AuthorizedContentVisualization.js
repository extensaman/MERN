import SignIn from "./SignIn";

export const AuthorizedContentVisualization = (props) => {
  return (
    <div>
      {props.data ? (
        <h3>{props.data.data}</h3>
      ) : (
        <SignIn setAppState={props.setAppState} />
      )}
    </div>
  );
};

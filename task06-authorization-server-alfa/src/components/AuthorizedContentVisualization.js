import SignIn from "./SignIn";

export const AuthorizedContentVisualization = (props) => {
  return <div>{props.data ? <h3>{props.data}</h3> : <SignIn />}</div>;
};

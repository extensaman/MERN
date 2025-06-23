import { Navigate } from "react-router-dom";

export const AuthorizedContentVisualization = (props) => {
  return (
    <div>
      {props.data ? <h3>{props.data}</h3> : <Navigate to={"/signin"} />}
    </div>
  );
};

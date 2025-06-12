import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import React from "react";

class AuthorizedContentVisualization extends React.Component {
  constructor(props) {
    super(props);
    const navigate = useNavigate();
    if (!props.data) navigate("/signin");
  }

  render() {
    return <h3>{props.data}</h3>;
  }
}

export default AuthorizedContentVisualization;

// export const AuthorizedContentVisualization = (props) => {
//   const navigate = useNavigate();
//   if (props.data) return <h3>{props.data}</h3>;
//   else navigate("signin");
//   //return <div>{props.data ? <h3>{props.data}</h3> : <SignIn />}</div>;
// };

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import { FRONT_SIGN_IN_URL } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={SignIn} />
        <Route path="/private" Component={SignIn} />
        <Route path={FRONT_SIGN_IN_URL} Component={SignIn} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

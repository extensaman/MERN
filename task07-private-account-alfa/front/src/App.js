import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import PrivateAccountLoader from "./components/PrivateAccountLoader";
import { FRONT_SIGN_IN_URL } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={PrivateAccountLoader} />
        <Route path="/private" Component={PrivateAccountLoader} />
        <Route path={FRONT_SIGN_IN_URL} Component={SignIn} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import PrivateAccountLoader from "./components/PrivateAccountLoader";
import {
  FRONT_SIGN_IN_URL,
  FRONT_SIGN_UP_GENERATE_URL,
  FRONT_SIGN_UP_ACTIVATE_URL,
} from "./constants";
import SignupGenerate from "./components/SignupGenerate";
import SignupActivate from "./components/SugnupActivate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={PrivateAccountLoader} />
        <Route path="/private" Component={PrivateAccountLoader} />
        <Route path={FRONT_SIGN_IN_URL} Component={SignIn} />
        <Route path={FRONT_SIGN_UP_GENERATE_URL} Component={SignupGenerate} />
        <Route path={FRONT_SIGN_UP_ACTIVATE_URL} Component={SignupActivate} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

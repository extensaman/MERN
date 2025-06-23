import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Home } from "./components/Home";
import { FreeContent } from "./components/FreeContent";
import AuthorizedContentLoader from "./components/AuthorizedContentLoader";
import SignIn from "./components/SignIn";
import { FRONT_SIGN_IN_URL } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/free">Free content</NavLink>
        <NavLink to={FRONT_SIGN_IN_URL}>Sign in</NavLink>
        <NavLink to="/authorized">Authorized content</NavLink>
      </nav>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/free" Component={FreeContent} />
        <Route path="/authorized" Component={AuthorizedContentLoader} />
        <Route path={FRONT_SIGN_IN_URL} Component={SignIn} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

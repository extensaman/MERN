import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { FreeContent } from "./components/FreeContent";
import { AuthorizedContentLoader } from "./components/AuthorizedContentLoader";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/free">Free content</Link>
          </li>
          <li>
            <Link to="/authorized">Authorized content</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/free" Component={FreeContent} />
        <Route path="authorized" Component={AuthorizedContentLoader} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import MainApp from "@/components/MainApp";
import Navigation from "./components/Navigation";
import Login from "@/components/LoginPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/homepage" Component={MainApp} />
          <Route path="/" Component={Login} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginScreen from "./pages/LoginScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" Component={HomePage} />
          <Route path="/" Component={LoginScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

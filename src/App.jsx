import { Route, Routes } from "react-router-dom";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { HomePage } from "./components/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

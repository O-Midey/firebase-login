import { Route, Routes } from "react-router-dom";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { HomePage } from "./components/HomePage";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

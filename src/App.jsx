import { Route, Routes } from "react-router-dom";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { HomePage } from "./components/HomePage";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

//styles for the alert box
const failedAlertStyle = {
  display: "block",
  transition: "0.5s",
  backgroundColor: "rgb(254, 6, 12)",
  position: "absolute",
  top: "10px",
};

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={<LogIn failedAlertStyle={failedAlertStyle} />}
          />
          <Route
            path="/signup"
            element={<SignUp failedAlertStyle={failedAlertStyle} />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

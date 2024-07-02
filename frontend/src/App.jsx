import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./Context/AuthContext";
function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

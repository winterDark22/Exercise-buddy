import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuthContext } from "./context/AuthContext";

//pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="mt-20">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

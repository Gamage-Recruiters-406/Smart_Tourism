import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Destination from "./pages/Destination";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";
import PackageDetailsPage from "./pages/PackageDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/destination" element={<Destination />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/packageDetails" element={<PackageDetailsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

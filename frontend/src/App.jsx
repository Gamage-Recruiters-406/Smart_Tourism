import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";
import ContactUs from "./pages/ContactUs";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Contactus" element={<ContactUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

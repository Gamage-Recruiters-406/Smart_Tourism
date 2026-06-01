import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Destination from "./pages/Destination";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthContext";
import "./index.css";
import PackageDetailsPage from "./pages/PackageDetails";
<<<<<<< Updated upstream
import ContactUs from "./pages/ContactUs";
import SignUp from "./pages/SignUp";
=======
import Layout from "./components/Layouts/Layout";
>>>>>>> Stashed changes


function isAdminUser(user) {
  return user?.role === "admin" || user?.userType === "admin" || user?.isAdmin;
}

function RootRedirect() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/destination" replace />;
  }

  return isAdminUser(user) ? (
    <Navigate to="/admin-dashboard" replace />
  ) : (
    <Navigate to="/destination" replace />
  );
}

function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !isAdminUser(user)) {
    return <Navigate to="/destination" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
<<<<<<< Updated upstream
          <Route path="/" element={<RootRedirect />} />
          <Route path="/destination" element={<Destination />} />
          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/packageDetails/:id" element={<PackageDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/Contactus" element={<ContactUs />} />
=======
          <Route element={<Layout />}>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/destination" element={<Destination />} />
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/packageDetails" element={<PackageDetailsPage />} />
            <Route path="/register" element={<Navigate to="/signin" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
>>>>>>> Stashed changes
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Shipments from "./pages/Shipments.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import AppShell from "./layout/AppShell.jsx";

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AppShell><Login /></AppShell>} />
      <Route path="/" element={<AppShell><Dashboard /></AppShell>} />

      <Route
        path="/shipments"
        element={
          <RequireAuth>
            <Shipments />
          </RequireAuth>
        }
      />

      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AppShell><Admin /></AppShell>
          </RequireAuth>
        }
      />

      <Route path="/404" element={<AppShell><NotFound /></AppShell>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

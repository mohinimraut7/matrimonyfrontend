import AppRoutes from "./routes/AppRoutes";
import { ProfileProvider } from "./context/ProfileContext";

export default function App() {
  return (
    <ProfileProvider>
      <div style={{ minHeight: "100vh", backgroundColor: "#f9f7f4" }}>
        <AppRoutes />
      </div>
    </ProfileProvider>
  );
}
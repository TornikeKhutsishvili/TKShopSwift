import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import useAuth from "./core/hooks/useAuth";

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg font-medium">Loading authentication...</span>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
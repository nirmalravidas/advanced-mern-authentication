import React, { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import Login from "./auth/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Hero from "./components/landing/Hero/hero";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import { userStore } from "./store/useUserStore";
import VerifyEmail from "./auth/VerifyEmail";
import ResetPassword from "./auth/ResetPassword";
import { ThemeProvider } from "./components/theme/theme-provider";
import ProfileForm from "./components/ProfileForm";
import Loading from "./components/Loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = userStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = userStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: "/profile/update",
        element: (
          <AuthenticatedUser>
            <ProfileForm />
          </AuthenticatedUser>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
]);

function App() {
  const { checkAuthentication, isCheckingAuth } = userStore();
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <RouterProvider router={appRouter}></RouterProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;

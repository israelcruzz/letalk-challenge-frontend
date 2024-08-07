import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export const LogoutRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

import { CreateLoan } from "@/pages/app/create-loan";
import { Details } from "@/pages/app/details";
import { Home } from "@/pages/app/home";
import { Success } from "@/pages/app/success";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details/:loanId",
    element: <Details />,
  },
  {
    path: "/loan/:loanId/success",
    element: <Success />,
  },
  {
    path: "/loan/create",
    element: <CreateLoan />,
  },
]);

export const AuthRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Posts from "./pages/Posts";
import Root from "./pages/Root";
import MultiStepForm from "./pages/MultiStepForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <MultiStepForm /> },
      { path: "/posts", element: <Posts /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;

import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Activity from "../pages/Activity";
import Setting from "../pages/Setting";

const setupRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Activity />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
      ],
    },
  ]);

export default setupRouter;

import { RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import setupRouter from "./router/router";

const router = setupRouter();

const App = () => {
  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  );
};

export default App;

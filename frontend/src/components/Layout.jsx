import { Outlet } from "react-router-dom";

import Title from "./Title";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Title />
      <Navbar />
      <main className="px-8 my-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

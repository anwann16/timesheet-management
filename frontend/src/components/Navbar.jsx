import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex flex-col bg-white mt-2 px-8 pt-4 pb-1">
      <h1 className="text-xl font-bold">HH Timesheet</h1>
      <nav className="ml-4 mt-4">
        <ul className="flex items-center gap-5 font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive &&
              "text-[#2775ec] border-b-[3px] border-spacing-10 border-[#2775ec] transition-all"
            }
          >
            Daftar Kegiatan
          </NavLink>
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              isActive &&
              "text-[#2775ec] border-b-[3px] border-spacing-10 border-[#2775ec] transition-all"
            }
          >
            Pengaturan
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

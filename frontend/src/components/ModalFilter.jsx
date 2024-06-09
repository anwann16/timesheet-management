import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import CustomFilter from "./FilterSelect";

const ModalFilter = ({ setFilter, setModalFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState([]);

  const handleFilter = () => {
    const projectId = selectedFilter.map((project) => project.id);
    setModalFilter(false);
    setFilter(projectId);
  };

  const clearFilters = () => {
    setSelectedFilter([]);
    setFilter([]);
    setModalFilter(false);
  };

  return (
    <>
      <div className="loading-bg min-h-screen"></div>
      <div className="bg-white w-[550px] h-64 z-10 centered rounded-lg">
        <div className="flex justify-between items-center p-5 border-b-2">
          <p className="text-lg font-bold">Filter</p>
          <IoMdClose
            size={25}
            onClick={() => setModalFilter(false)}
            className="cursor-pointer"
          />
        </div>

        <div className="p-5 border-b-2">
          <p className="mb-2">Proyek</p>
          <div className="w-full">
            <CustomFilter setSelectedFilter={setSelectedFilter} />
          </div>
        </div>

        <div className="flex justify-end p-5">
          <div className="flex gap-5">
            <button
              className="font-bold px-4 text-[#f15858] text-sm"
              onClick={clearFilters}
            >
              Hapus Filter
            </button>
            <button
              className="font-bold px-4 py-2 rounded-md bg-[#f15858] text-white text-sm"
              onClick={handleFilter}
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFilter;

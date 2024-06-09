import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";

import { fetchProjectApi } from "../services/projects";

const CustomFilter = ({ setSelectedFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const fetchProjects = async () => {
    const data = await fetchProjectApi();
    setProjects(data);
  };

  const toggleSelectMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setIsOpen(false);
    setSelectedFilter([...selectedOptions, option]);
  };

  const removeOption = (optionToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option !== optionToRemove)
    );
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="relative inline-block w-full">
      <div
        className={`flex gap-3 items-center px-4 border border-gray-300 rounded cursor-pointer ${
          selectedOptions.length > 0 ? "py-2" : "py-5"
        }`}
        onClick={toggleSelectMenu}
      >
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className={`py-[2px] px-3 rounded-full flex items-center gap-2 ${
              selectedOptions.length !== 0 ? "bg-[#f0f6ff]" : ""
            }`}
          >
            {selectedOptions.length !== 0 && (
              <IoCloseCircleSharp
                size={22}
                color="gray"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(option);
                }}
              />
            )}
            <span className="text-base font-semibold">{option.name}</span>
          </div>
        ))}
        <button className="absolute right-2 text-gray-600">
          <IoIosArrowDown size={20} />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {projects.map((project) => (
            <div
              key={project.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => selectOption(project)}
            >
              {project.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomFilter;

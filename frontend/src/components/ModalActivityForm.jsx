import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";

import { fetchProjectApi } from "../services/projects";
import {
  addActivity,
  fetchActivityById,
  updateActivyApi,
} from "../services/activities";
import { extractTimeOnly, getDate } from "../helpers/converter";

const ModalActivityForm = ({
  handleModal,
  selectedActivity,
  setModalActivities,
  setNotif,
  setMessage,
  setModalProject,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProject, setSelectedProject] = useState({});

  const form = useForm({
    defaultValues: async () => {
      if (selectedActivity) {
        const data = await fetchActivityById(selectedActivity);
        return {
          title: data.title,
          projectId: data.projectId,
          startDate: getDate(data.startDate),
          endDate: getDate(data.endDate),
          startTime: extractTimeOnly(data.startTime),
          endTime: extractTimeOnly(data.endTime),
        };
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const fetchProjects = async () => {
    const data = await fetchProjectApi();
    setProjects(data);
  };

  let btnDisabled = false;

  const submitActivity = async (data) => {
    if (!selectedActivity) {
      const newData = {
        title: data.title,
        projectId: selectedProject.id,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
      };
      await addActivity(newData);
      setModalActivities(false);
      setMessage("Tambah Kegiatan Success");
      setNotif(true);
    } else {
      await updateActivyApi(selectedActivity, data);
      setModalActivities(false);
      setMessage("Update Kegiatan Success");
      setNotif(true);
    }
  };

  const toggleSelectMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleAddProject = () => {
    setModalProject(true);
    setModalActivities(false);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className="loading-bg min-h-screen"></div>
      <div className="bg-white w-1/2 h-[55%] z-10 centered rounded-lg">
        <div className="flex justify-between p-4 border-b-2">
          <p className="font-bold">Tambah Kegiatan Baru</p>
          <IoMdClose
            size={23}
            className="cursor-pointer"
            onClick={handleModal}
          />
        </div>
        <form onSubmit={handleSubmit(submitActivity)}>
          <div className="flex">
            <div className="flex flex-col gap-2 w-48 p-4">
              <label
                htmlFor="startDate"
                className="text-sm font-semibold text-slate-500"
              >
                Tanggal Mulai <span className="text-red-500"> *</span>
              </label>
              <input
                type="date"
                id="startDate"
                className={`outline-none py-1 px-2 border ${
                  errors.startDate && "border-red-500"
                }`}
                {...register("startDate", { required: true })}
              />
              {errors.startDate && (
                <span className="text-red-500 text-xs font-bold -mt-1">
                  Tanggal Mulai harus diisi
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-48 p-4">
              <label
                htmlFor="endDate"
                className="text-sm font-semibold text-slate-500"
              >
                Tanggal Berakhir <span className="text-red-500"> *</span>
              </label>
              <input
                type="date"
                id="endDate"
                className={`outline-none py-1 px-2 border ${
                  errors.endDate && "border-red-500"
                }`}
                {...register("endDate", { required: true })}
              />
              {errors.endDate && (
                <span className="text-red-500 text-xs font-bold -mt-1">
                  Tanggal Berakhir harus diisi
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-48 p-4">
              <label
                htmlFor="startTime"
                className="text-sm font-semibold text-slate-500"
              >
                Waktu Mulai <span className="text-red-500"> *</span>
              </label>
              <input
                type="time"
                id="startTime"
                className={`outline-none py-1 px-2 border ${
                  errors.startTime && "border-red-500"
                }`}
                {...register("startTime", { required: true })}
              />
              {errors.startTime && (
                <span className="text-red-500 text-xs font-bold -mt-1">
                  Waktu Mulai harus diisi
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-48 p-4">
              <label
                htmlFor="endTime"
                className="text-sm font-semibold text-slate-500"
              >
                Waktu Berakhir <span className="text-red-500"> *</span>
              </label>
              <input
                type="time"
                id="endTime"
                className={`outline-none py-1 px-2 border ${
                  errors.endTime && "border-red-500"
                }`}
                {...register("endTime", { required: true })}
              />
              {errors.endTime && (
                <span className="text-red-500 text-xs font-bold -mt-1">
                  Waktu Berakhir harus diisi
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col px-4 gap-1">
              <label
                htmlFor="title"
                className="text-sm font-semibold text-slate-500"
              >
                Judul Kegiatan <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="title"
                className={`outline-none py-1 px-2 border ${
                  errors.title && "border-red-500"
                }`}
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-500 text-xs font-bold -mt-1">
                  Judul Kegiatan harus diisi
                </span>
              )}
            </div>

            <div className="flex flex-col px-4 gap-1">
              <label
                htmlFor="projectId"
                className="text-sm font-semibold text-slate-500"
              >
                Nama Proyek <span className="text-red-500"> *</span>
              </label>
              {/* <select
                id="projectId"
                className="outline-[#2775ec] focus:outline-[#2775ec] border rounded-md py-1 px-2"
                {...register("projectId")}
              >
                <option disabled>Select Project</option>
                {projects.map((project, index) => (
                  <option key={index} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select> */}
              <div className="relative inline-block w-full">
                <div
                  className="flex justify-between items-center px-4 py-2 border border-gray-300 rounded cursor-pointer"
                  onClick={toggleSelectMenu}
                >
                  <span>{selectedOption}</span>
                  <button
                    className="ml-2 text-gray-600"
                    onClick={toggleSelectMenu}
                  >
                    <IoIosArrowDown size={17} />
                  </button>
                </div>
                {isOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    <div
                      className="px-4 pt-2 cursor-pointer text-[#f15858]"
                      onClick={handleAddProject}
                    >
                      + Tambah Proyek
                    </div>
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          selectOption(project.name);
                          setSelectedProject(project);
                        }}
                      >
                        {project.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end p-4">
            <div className="flex items-center gap-3">
              <button
                className="py-2 px-5 font-bold text-[#f15858]"
                onClick={handleModal}
              >
                Kembali
              </button>
              <button
                type="submit"
                className={`bg-[#f15858] py-2 px-5 rounded-md font-bold text-white ${
                  btnDisabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={btnDisabled}
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalActivityForm;

import { IoMdClose } from "react-icons/io";
import CustomFilter from "./FilterSelect";
import { useForm } from "react-hook-form";
import { addProjectApi } from "../services/projects";

const ProjectForm = ({
  setModalProject,
  setModalActivities,
  setMessage,
  setNotif,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addProject = async (data) => {
    await addProjectApi(data);
    setModalProject(false);
    setModalActivities(false);
    setNotif(true);
    setMessage("Tambah Proyek Berhasil");
  };
  return (
    <>
      <div className="loading-bg min-h-screen"></div>
      <div className="bg-white w-[550px] h-64 z-10 centered rounded-lg">
        <div className="flex justify-between items-center p-5 border-b-2">
          <p className="text-lg font-bold">Tambah Proyek Baru</p>
          <IoMdClose
            size={25}
            onClick={() => setModalProject(false)}
            className="cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmit(addProject)}>
          <div className="p-5 border-b-2">
            <div className="w-full">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-slate-500"
                >
                  Nama Proyek <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className={`outline-none py-1 px-2 border ${
                    errors.name && "border-red-500"
                  }`}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs font-bold -mt-1">
                    Nama Proyek harus diisi
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end p-5">
            <div className="flex gap-5">
              <button
                className="font-bold px-4 text-[#f15858] text-sm"
                onClick={() => {
                  setModalProject(false);
                  setModalActivities(true);
                }}
              >
                Kembali
              </button>
              <button className="font-bold px-4 py-2 rounded-md bg-[#f15858] text-white text-sm">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;

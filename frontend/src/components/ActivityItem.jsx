import { FaRegTrashAlt } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { deleteActivityApi } from "../services/activities";

import { extractTimeOnly, getDate } from "../helpers/converter";

const ActivityItem = ({
  id,
  title,
  startDate,
  endDate,
  startTime,
  endTime,
  duration,
  setNotif,
  project,
  setMessage,
  setModalActivities,
  handleActivitySelect,
}) => {
  const handleDelete = async (id) => {
    setMessage("Hapus Kegiatan Success");
    setNotif(true);
    await deleteActivityApi(id);
  };

  const handleSelect = (id) => {
    handleActivitySelect(id);
    setModalActivities(true);
  };

  return (
    <>
      <tr>
        <td className="border-2 border-gray-100 pl-2 py-2 text-sm font-semibold ">
          {title}
        </td>
        <td className="border-2 border-gray-100 pl-2 py-2 text-sm font-semibold ">
          {project.name}
        </td>
        <td className="border-2 border-gray-100 pl-2 py-2 text-sm font-semibold ">
          {getDate(startDate)}
        </td>
        <td className="border-2 border-gray-100 pl-2 py-2 text-sm font-semibold ">
          {getDate(endDate)}
        </td>
        <td className="border-2 border-gray-100 pl-2 py-2 text-sm font-semibold ">
          {extractTimeOnly(startTime)}
        </td>
        <td className="border-2 border-gray-100 pl-2 py-2 text-sm font-semibold ">
          {extractTimeOnly(endTime)}
        </td>
        <td className="border-2 border-gray-100 pl-2 py-2 text-sm font-semibold ">
          {duration}
        </td>
        <td className="border-2 border-gray-100 pl-2 py-2 text-sm font-semibold ">
          <div className="flex gap-2 justify-center">
            <HiPencilSquare color="#f15858" onClick={() => handleSelect(id)} />
            <FaRegTrashAlt color="#f15858" onClick={() => handleDelete(id)} />
          </div>
        </td>
      </tr>

      {/* {notif && (
        <ModalNotifSucces
          setNotif={setNotif}
          message="Hapus kegiatan success"
          opacity="opacity-20"
        />
      )} */}
    </>
  );
};

export default ActivityItem;

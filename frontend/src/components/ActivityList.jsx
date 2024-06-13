import { IoFilter } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
// import { CSVLink } from "react-csv";
import { LuPlusCircle, LuSearch } from "react-icons/lu";

import UserInfo from "./UserInfo";
import SortButton from "./SortButton";
import ProjectForm from "./ProjectForm";
import ModalFilter from "./ModalFilter";
import ActivityItem from "./ActivityItem";
import ModalNotifSucces from "./ModalNotifSucces";
import ModalActivityForm from "./ModalActivityForm";

import { fetchUserApi } from "../services/user";
import { fetchActivitiesApi } from "../services/activities";
import { formatIDRCurrency } from "../helpers/formatCurrency";
import { convertTotalDuration } from "../helpers/convertTotalDuration";
import { calculateTotalDuration } from "../helpers/calculateTotalDuration";
import { CSVLink } from "react-csv";
import { headers } from "../helpers/headers";

const ActivityList = () => {
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState([]);
  const [order, setOrder] = useState("asc");
  const [notif, setNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [activities, setActivities] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalFilter, setModalFilter] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [modalProject, setModalProject] = useState(false);
  const [modalActivities, setModalActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [search] = useDebounce(searchQuery, 1000);

  const fetchActivities = async () => {
    const data = await fetchActivitiesApi(search, sortBy, order, filter);
    setActivities(data);
  };

  const fetchUser = async () => {
    const data = await fetchUserApi();
    setUser(data);
  };

  const handleModal = () => {
    setModalActivities(!modalActivities);
  };

  const handleActivitySelect = (activityId) => {
    setSelectedActivity(activityId);
  };

  const handleSort = (sortField) => {
    if (sortBy === sortField) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortField);
      setOrder("asc");
    }
  };

  const totalPendapatan = totalDuration * (user?.rate / 60);

  useEffect(() => {
    fetchActivities();
    fetchUser();
  }, [search, notif, sortBy, order, filter]);

  useEffect(() => {
    setTotalDuration(calculateTotalDuration(activities));
  }, [activities]);

  return (
    <>
      <div className=" min-h-full rounded-lg shadow-sm">
        <UserInfo user={user} />
        <div className="mt-3 bg-white flex flex-col px-4 h-[400px]">
          <div className="flex items-center justify-between">
            <div className="flex py-4">
              <div className="flex items-center gap-6">
                <p className="text-base font-bold">Daftar Kegiatan</p>
                <div
                  className="bg-[#f0f6ff] flex items-center py-1 px-3 gap-1 text-base font-bold text-[#2775ec] cursor-pointer"
                  onClick={handleModal}
                >
                  <LuPlusCircle />
                  <span>Tambah Kegiatan</span>
                </div>
              </div>
              {activities.length > 0 && (
                <div className="py-2 px-4 bg-[#f15858] rounded-md text-sm font-semibold text-white absolute right-10 top-28">
                  <CSVLink
                    data={activities}
                    headers={headers}
                    filename="timesheet.csv"
                  >
                    Export to CSV
                  </CSVLink>
                </div>
              )}
            </div>
            <div className="flex py-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 w-52 border-2 border-gray-100 p-2 rounded-md">
                  <LuSearch size={20} color="gray" />
                  <input
                    type="text"
                    className="w-full outline-none border-none px-2 placeholder:text-sm"
                    placeholder="Cari"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div
                  className="border-2 border-gray-100 p-2"
                  onClick={() => setModalFilter(true)}
                >
                  <IoFilter size={24} color="#F15858" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f7f8fb] p-1 rounded-md shadow-sm pb-5 overflow-y-auto mb-5">
            <table className="bg-white px-10 min-w-full border-2 border-gray-100">
              <thead>
                <tr>
                  <th className="border-2 border-gray-100 w-1/4 py-2 text-left pl-2 text-sm font-bold">
                    <div className="flex gap-1 items-center">
                      <span>Judul Kegiatan</span>
                      <SortButton handleSort={() => handleSort("title")} />
                    </div>
                  </th>
                  <th className="border-2 border-gray-100 w-1/6 py-2 text-left pl-2 text-sm font-bold">
                    <div className="flex gap-1 items-center">
                      <span>Nama Proyek</span>
                      <SortButton handleSort={() => handleSort("projectId")} />
                    </div>
                  </th>
                  <th className="border-2 border-gray-100 py-2 text-left pl-2 text-sm font-bold">
                    <div className="flex gap-1 items-center">
                      <span>Tanggal Mulai</span>
                      <SortButton handleSort={() => handleSort("startDate")} />
                    </div>
                  </th>
                  <th className="border-2 border-gray-100 py-2 text-left pl-2 text-sm font-bold">
                    <div className="flex gap-1 items-center">
                      <span>Tanggal Berakhir</span>
                      <SortButton handleSort={() => handleSort("endDate")} />
                    </div>
                  </th>
                  <th className="border-2 border-gray-100 py-2 text-left pl-2 text-sm font-bold">
                    <div className="flex gap-1 items-center">
                      <span>Waktu Mulai</span>
                      <SortButton handleSort={() => handleSort("startTime")} />
                    </div>
                  </th>
                  <th className="border-2 border-gray-100 py-2 text-left pl-2 text-sm font-bold">
                    <div className="flex gap-1 items-center">
                      <span>Waktu Berakhir</span>
                      <SortButton handleSort={() => handleSort("endTime")} />
                    </div>
                  </th>
                  <th className="border-2 border-gray-100 py-2 text-left pl-2 text-sm font-bold">
                    <div className="flex gap-1 items-center">
                      <span>Durasi</span>
                      <SortButton handleSort={() => handleSort("duration")} />
                    </div>
                  </th>
                  <th className="border-2 border-gray-100 py-2 text-left pl-2 text-sm font-bold">
                    <div className="flex gap-1 items-center">
                      <span>Aksi</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities?.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    {...activity}
                    notif={notif}
                    setNotif={setNotif}
                    setMessage={setMessage}
                    setModalActivities={setModalActivities}
                    handleActivitySelect={() =>
                      handleActivitySelect(activity.id)
                    }
                  />
                ))}
              </tbody>
            </table>
            {activities.length === 0 && (
              <p className="py-5 px-1 text-center bg-white font-bold text-gray-500 text-sm">
                Belum ada kegiatan
              </p>
            )}

            <div className="flex items-center justify-between text-sm font-semibold px-2 pt-2">
              <p className="text-[#2775ec]">Total Durasi</p>
              <p className="text-[#2775ec]">
                {totalDuration ? convertTotalDuration(totalDuration) : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between text-base font-bold px-2">
              <p className="text-[#2775ec]">Total Pendapatan</p>
              <p className="text-[#2775ec]">
                {totalPendapatan ? formatIDRCurrency(totalPendapatan) : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {modalActivities && (
        <ModalActivityForm
          handleModal={handleModal}
          modalActivities={modalActivities}
          setModalActivities={setModalActivities}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          setModalProject={setModalProject}
          setNotif={setNotif}
          setMessage={setMessage}
        />
      )}

      {notif && (
        <ModalNotifSucces
          setNotif={setNotif}
          message={message}
          opacity="opacity-50"
        />
      )}

      {modalFilter && (
        <ModalFilter
          setModalFilter={setModalFilter}
          setFilter={setFilter}
          filter={filter}
        />
      )}

      {modalProject && (
        <ProjectForm
          setModalProject={setModalProject}
          setModalActivities={setModalActivities}
          setNotif={setNotif}
          setMessage={setMessage}
        />
      )}
    </>
  );
};

export default ActivityList;

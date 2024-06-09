import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ModalNotifSucces from "./ModalNotifSucces";
import { fetchUserApi, updatedUserApi } from "../services/user";

const SettingForm = () => {
  const [notif, setNotif] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: async () => {
      const data = await fetchUserApi();
      return {
        name: data.name,
        rate: data.rate,
      };
    },
  });

  const { register, handleSubmit } = form;

  const onSubmitData = async (data) => {
    await updatedUserApi(parseFloat(data.rate));
    setNotif(true);
  };

  return (
    <>
      <div className="flex justify-center my-24">
        <div className="bg-white w-[400px] rounded-md shadow-sm py-10">
          <div className="w-72 flex flex-col items-center m-auto">
            <form
              className="flex flex-col gap-7 w-full"
              onSubmit={handleSubmit(onSubmitData)}
            >
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="font-semibold">
                  Nama Karyawan
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  disabled
                  className="outline-none border rounded-md p-2 border-gray-100 w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="rate" className="font-semibold">
                  Rate
                </label>
                <div className="flex items-center justify-between border rounded-md border-gray-100 w-full p-2">
                  <input
                    type="number"
                    id="rate"
                    {...register("rate")}
                    className="outline-none"
                  />
                  <span className="text-gray-500">/jam</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-[#f7f8fb] py-1 px-7 text-[#2775ec] rounded-md font-semibold"
                  onClick={() => navigate("/")}
                >
                  Batalkan
                </button>
                <button className="bg-[#2775ec] py-1 px-7 text-white rounded-md font-semibold">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {notif && (
        <ModalNotifSucces setNotif={setNotif} message="Update Rate Success" />
      )}
    </>
  );
};

export default SettingForm;

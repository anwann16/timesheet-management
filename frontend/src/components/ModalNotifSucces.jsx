import { IoMdClose } from "react-icons/io";
import accImage from "../assets/accept.png";

const ModalNotifSucces = ({ setNotif, message }) => {
  return (
    <>
      <div className="loading-bg min-h-screen opacity-30"></div>
      <div className="bg-white w-[500px] h-64 z-10 centered rounded-lg">
        <p
          className="right-0 absolute p-2 cursor-pointer"
          onClick={() => setNotif(false)}
        >
          <IoMdClose size={25} />
        </p>
        <div className="flex flex-col items-center gap-3 py-8">
          <img src={accImage} alt="" className="w-28 h-28" />
          <h1 className="text-2xl font-bold">Berhasil</h1>
          <p className="text-lg -mt-2">{message}</p>
        </div>
      </div>
    </>
  );
};

export default ModalNotifSucces;

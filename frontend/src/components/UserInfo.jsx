import { formatIDRCurrency } from "../helpers/formatCurrency";

const UserInfo = ({ user }) => {
  return (
    <div className="bg-white flex items-center gap-16 p-4">
      <div className="flex flex-col">
        <span className="text-sm font-bold">Nama Karyawan</span>
        <span className="text-medium font-semibold">{user?.name}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold">Rate</span>
        <span className="text-medium font-semibold">
          {formatIDRCurrency(user?.rate)}/jam
        </span>
      </div>
    </div>
  );
};

export default UserInfo;

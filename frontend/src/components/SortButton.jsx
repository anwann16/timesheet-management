import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const SortButton = ({ handleSort }) => {
  return (
    <div onClick={() => handleSort()}>
      <IoMdArrowDropup className="-mb-3" size={18} />
      <IoMdArrowDropdown size={18} />
    </div>
  );
};

export default SortButton;

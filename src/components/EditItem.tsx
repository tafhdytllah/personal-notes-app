import { ROUTES } from "@/constants/route";
import PropTypes from "prop-types";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type EditItemProps = {
  id: string;
};
const EditItem = ({ id }: EditItemProps) => {
  const navigate = useNavigate();
  const redirectUrl = ROUTES["notes-edit"].replace(":id", id);

  return (
    <>
      <button
        className="p-2 rounded-full hover:bg-gray-400 transition"
        onClick={(e) => {
          e.stopPropagation();
          navigate(redirectUrl);
        }}
      >
        <FaPencilAlt className="h-4 w-4 text-foreground" />
      </button>
    </>
  );
};

EditItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditItem;

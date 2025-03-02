import { FaTrash } from "react-icons/fa";

type NotesItemProps = {
  noteId: string;
  onDeleteChange: (id: string) => void;
};
const DeleteItem = ({ noteId, onDeleteChange }: NotesItemProps) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteChange(noteId ?? "");
        }}
        className="p-2 rounded-full hover:bg-gray-400 transition"
      >
        <FaTrash className="h-4 w-4 text-foreground" />
      </button>
    </>
  );
};

export default DeleteItem;

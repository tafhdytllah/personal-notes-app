import { FaBookmark, FaRegBookmark } from "react-icons/fa";

type BookMarkItemProps = {
  isBookmark: boolean;
  onArchive: (id: string) => void;
  noteId: string;
  onBookmark: () => void;
};

const BookMarkItem = ({
  isBookmark,
  onArchive,
  onBookmark,
  noteId,
}: BookMarkItemProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onArchive(noteId);
        onBookmark();
      }}
      className="p-2 rounded-full hover:bg-gray-400 transition"
    >
      {isBookmark ? (
        <FaBookmark className="h-4 w-4 text-foreground" />
      ) : (
        <FaRegBookmark className="h-4 w-4 text-foreground" />
      )}
    </button>
  );
};

export default BookMarkItem;

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
      className="p-2 rounded-full hover:bg-gray-200 transition"
    >
      {isBookmark ? (
        <FaBookmark className="h-5 w-5 text-foreground" />
      ) : (
        <FaRegBookmark className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
};

export default BookMarkItem;

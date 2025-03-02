import BookMarkItem from "@/components/BookmarkItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/route";
import { Note } from "@/types/note";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type NotesItemProps = {
  note: Note;
  onArchiveChange: (id: string) => void;
  onDeleteChange: (id: string) => void;
};

const NoteItem = ({
  note,
  onArchiveChange,
  onDeleteChange,
}: NotesItemProps) => {
  const [isBookmark, setIsBookmark] = useState<boolean>(note.archived);
  const navigate = useNavigate();
  const redirectUrl = ROUTES["notes-detail"].replace(":id", note.id);
  const formattedDate = format(
    new Date(note.createdAt),
    "dd MMMM yyyy HH:mm:ss",
    {
      locale: id,
    },
  );

  const handleBookmark = () => {
    setIsBookmark(!isBookmark);
  };

  return (
    <Card
      className="relative rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(redirectUrl)}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
          <div className="flex gap-x-2">
            <BookMarkItem
              isBookmark={isBookmark}
              onArchive={onArchiveChange}
              onBookmark={handleBookmark}
              noteId={note.id ?? ""}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChange(note.id ?? "");
              }}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <FaTrash className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm line-clamp-3">{note.body}</p>
      </CardContent>
    </Card>
  );
};

export default NoteItem;

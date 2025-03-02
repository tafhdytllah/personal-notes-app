import BookMarkItem from "@/components/BookmarkItem";
import DeleteItem from "@/components/DeleteItem";
import EditItem from "@/components/EditItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/route";
import { Note } from "@/types/note";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import PropTypes from "prop-types";
import { useState } from "react";
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

  const noteId = note.id ?? "";

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
          <div className="flex">
            <BookMarkItem
              isBookmark={isBookmark}
              onArchive={onArchiveChange}
              onBookmark={handleBookmark}
              noteId={noteId}
            />
            <EditItem id={noteId} />
            <DeleteItem noteId={noteId} onDeleteChange={onDeleteChange} />
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

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  onArchiveChange: PropTypes.func.isRequired,
  onDeleteChange: PropTypes.func.isRequired,
};

export default NoteItem;

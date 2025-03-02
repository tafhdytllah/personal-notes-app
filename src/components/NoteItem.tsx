import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/route";
import { Note } from "@/types/note";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

type NotesItemProps = {
  note: Note;
};

const NoteItem = ({ note }: NotesItemProps) => {
  const navigate = useNavigate();
  const redirectUrl = ROUTES["notes-detail"].replace(":id", note.id);
  const formattedDate = format(new Date(note.createdAt), "dd MMMM yyyy", {
    locale: id,
  });

  return (
    <Card
      className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200"
      onClick={() => navigate(redirectUrl)}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm line-clamp-3">{note.body}</p>
      </CardContent>
    </Card>
  );
};

export default NoteItem;

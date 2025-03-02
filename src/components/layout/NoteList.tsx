import Empty from "@/components/Empty";
import NoteItem from "@/components/NoteItem";
import { LangOption } from "@/constants";
import { Note } from "@/types/note";

type NoteListProps = {
  initialData: Note[];
  language: LangOption;
  onArchiveChange: (id: string) => void;
  onDeleteChange: (id: string) => void;
};

const NoteList = ({
  initialData,
  language,
  onArchiveChange,
  onDeleteChange,
}: NoteListProps) => {
  return (
    <>
      {initialData.length > 0 ? (
        <div className="container mx-auto px-4 pt-4 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {initialData.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onArchiveChange={onArchiveChange}
                onDeleteChange={onDeleteChange}
              />
            ))}
          </div>
        </div>
      ) : (
        <Empty language={language} />
      )}
    </>
  );
};

export default NoteList;

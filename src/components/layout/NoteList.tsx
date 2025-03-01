import Empty from "@/components/Empty";
import NoteItem from "@/components/NoteItem";
import { LangOption } from "@/constants";
import { Note } from "@/types/note";
import { useState } from "react";

type NoteListProps = {
  initialData: Note[];
  language: LangOption;
};

const NoteList = ({ initialData, language }: NoteListProps) => {
  const [notes] = useState<Note[]>(initialData);

  return (
    <>
      {notes.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note} />
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

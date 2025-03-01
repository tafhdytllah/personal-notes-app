import Empty from "@/components/Empty";
import NoteList from "@/components/layout/NoteList";
import Loading from "@/components/Loading";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/note";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { notes, loading } = useNotes();
  const { language } = useLanguage();
  const [activeNote, setActiveNote] = useState<Note[]>([]);

  useEffect(() => {
    const filterActiveNotes = notes.filter((note) => !note.archived);
    setActiveNote(filterActiveNotes);
  }, [notes]);

  return (
    <>
      {loading ? (
        <Loading language={language as LangOption} />
      ) : activeNote.length > 0 ? (
        <NoteList initialData={activeNote} language={language as LangOption} />
      ) : (
        <Empty language={language as LangOption} />
      )}
    </>
  );
};

export default HomePage;

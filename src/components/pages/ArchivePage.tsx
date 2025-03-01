import Empty from "@/components/Empty";
import NoteList from "@/components/layout/NoteList";
import Loading from "@/components/Loading";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/note";
import { useEffect, useState } from "react";

const ArchivePage = () => {
  const { notes, loading } = useNotes();
  const { language } = useLanguage();
  const [archiveNote, setArchiveNote] = useState<Note[]>([]);

  useEffect(() => {
    const filterArchiveNotes = notes.filter((note) => note.archived);
    setArchiveNote(filterArchiveNotes);
  }, [notes]);

  return (
    <>
      {loading ? (
        <Loading language={language as LangOption} />
      ) : archiveNote.length > 0 ? (
        <NoteList initialData={archiveNote} language={language as LangOption} />
      ) : (
        <Empty language={language as LangOption} />
      )}
    </>
  );
};

export default ArchivePage;

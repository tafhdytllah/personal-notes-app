import NoteForm from "@/components/layout/NoteForm";
import NotFoundPage from "@/components/pages/NotFoundPage";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import { getNoteById } from "@/services/NotesService";
import { Note } from "@/types/note";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { language: lang } = useLanguage();
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (id) {
      const fetchedNote = getNoteById(id as string);
      setNote(fetchedNote);
    }
  }, [id]);

  if (!note) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <TitlePage title={getLanguage("page.*.detail", lang as LangOption)} />
      <NoteForm type="VIEW" initialData={note} />
    </div>
  );
};

export default DetailPage;

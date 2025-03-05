import NoteForm from "@/components/layout/NoteForm";
import NotFoundPage from "@/components/pages/NotFoundPage";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import { NetworkData } from "@/lib/network-data";
import { Note } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const { language: lang } = useLanguage();
  const [note, setNote] = useState<Note | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        const fetchedNote = await NetworkData.getNote(id as string);
        if (fetchedNote.error) {
          console.error("Gagal mengambil catatan");
          return;
        }
        setNote(fetchedNote.data);
      }
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <TitlePage title={getLanguage("page.*.edit", lang as LangOption)} />
      <NoteForm type="EDIT" initialData={note} />
    </div>
  );
};

export default EditPage;

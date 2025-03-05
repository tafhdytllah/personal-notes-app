import NoteForm from "@/components/layout/NoteForm";
import Loading from "@/components/Loading";
import NotFoundPage from "@/components/pages/NotFoundPage";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import { NetworkData } from "@/lib/network-data";
import { Note } from "@/types/note";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { language: lang } = useLanguage();
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        setLoading(true);
        const fetchedNote = await NetworkData.getNote(id as string);
        if (fetchedNote.error) {
          console.error("Gagal mengambil catatan");
          return;
        }
        setNote(fetchedNote.data);
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

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

import NoteForm from "@/components/layout/NoteForm";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import { getNoteById } from "@/services/NotesService";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { language } = useLanguage();
  const { id } = useParams();

  const note = getNoteById(id as string);

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <TitlePage title={getLanguage("page.*.detail", language as LangOption)} />
      <NoteForm
        type="VIEW"
        initialData={note}
        language={language as LangOption}
      />
    </div>
  );
};

export default DetailPage;

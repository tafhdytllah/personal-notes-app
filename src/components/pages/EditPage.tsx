import NoteForm from "@/components/layout/NoteForm";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const { language: lang } = useLanguage();
  const { id } = useParams();

  const note = getNoteById(id as string);

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <TitlePage title={getLanguage("page.*.edit", lang as LangOption)} />
      <NoteForm type="EDIT" initialData={note} />
    </div>
  );
};

export default EditPage;

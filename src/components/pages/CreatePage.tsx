import NoteForm from "@/components/layout/NoteForm";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import getLanguage from "@/lib/language";

const CreatePage = () => {
  const { language: lang } = useLanguage();

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <TitlePage title={getLanguage("page.create", lang as LangOption)} />
      <NoteForm type="NEW" initialData={null} />
    </div>
  );
};

export default CreatePage;

import Empty from "@/components/Empty";
import Actionbar from "@/components/layout/Actionbar";
import NoteList from "@/components/layout/NoteList";
import Loading from "@/components/Loading";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { ROUTES } from "@/constants/route";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotes } from "@/hooks/useNotes";
import getLanguage from "@/lib/language";
import { NetworkData } from "@/lib/network-data";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ArchivePage = () => {
  const { language: lang } = useLanguage();
  const { notes, setNotes, loading: loadingNotes } = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || "",
  );
  const { user, loading: loadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuth && !user) {
      navigate(ROUTES["login"]);
    }
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      const { error, data } = await NetworkData.getArchivedNotes();
      if (!error && data) {
        setNotes(data);
      }
    };

    fetchArchivedNotes();
  }, [setNotes]);

  const archivedNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.archived &&
          note.title.toLowerCase().includes(keyword.toLowerCase()),
      ),
    [notes, keyword],
  );

  if (loadingAuth || loadingNotes) return <Loading />;
  if (!user) return null;

  const onDeleteChangeHandler = (id: string) => {
    console.log(id);
    // deleteNote(id);
    // setNotes(getAllNotes());
  };

  const onArchiveChangeHandler = (id: string) => {
    console.log(id);
    // unarchiveNote(id);
    // setNotes(getAllNotes());
  };

  const onKeywordChangeHandler = (keyword: string) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <TitlePage title={getLanguage("page.archive", lang as LangOption)} />
      <Actionbar
        keyword={keyword}
        onKeywordChange={onKeywordChangeHandler}
        isAddNote={false}
      />
      {archivedNotes.length > 0 ? (
        <NoteList
          initialData={archivedNotes}
          onArchiveChange={onArchiveChangeHandler}
          onDeleteChange={onDeleteChangeHandler}
        />
      ) : (
        <Empty text="page.empty.archive" />
      )}
    </div>
  );
};

export default ArchivePage;

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
import { Note } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ArchivePage = () => {
  const { language: lang } = useLanguage();
  const { notes, setNotes, loading: loadingNotes } = useNotes();
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || "",
  );
  const { user, loading: loadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (notes.length > 0) {
      setFilteredNotes(
        keyword
          ? notes.filter((note) =>
              note.title.toLowerCase().includes(keyword.toLowerCase()),
            )
          : notes,
      );
    } else {
      setFilteredNotes([]);
    }
  }, [notes, keyword]);

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

  if (loadingAuth || loadingNotes) return <Loading />;
  if (!user) return null;

  const onDeleteChangeHandler = async (id: string) => {
    const result = await NetworkData.deleteNote(id);
    if (result.error) {
      console.error("Gagal hapus catatan");
      return;
    }

    const notesWithoutDeleted = notes.filter((note) => note.id !== id);
    setNotes(notesWithoutDeleted);
  };

  const onArchiveChangeHandler = async (id: string) => {
    const result = await NetworkData.unarchiveNote(id);
    if (result.error) {
      console.error("Gagal mengembalikan arsip catatan");
      return;
    }

    const archiveNotes = notes.filter((notes) => notes.id !== id);
    setNotes(archiveNotes);
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
      {filteredNotes.length > 0 ? (
        <NoteList
          initialData={filteredNotes}
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

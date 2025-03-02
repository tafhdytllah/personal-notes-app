import Empty from "@/components/Empty";
import Actionbar from "@/components/layout/Actionbar";
import NoteList from "@/components/layout/NoteList";
import Loading from "@/components/Loading";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotes } from "@/hooks/useNotes";
import getLanguage from "@/lib/language";
import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  getAllNotes,
} from "@/services/NotesService";
import { Note } from "@/types/note";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const { language: lang } = useLanguage();
  const { notes, setNotes, loading } = useNotes();
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || "",
  );

  useEffect(() => {
    const currentNotes = getActiveNotes();

    if (keyword === "") {
      setActiveNotes(currentNotes);
    } else {
      const filteredNotes: Note[] = getActiveNotes().filter((note) => {
        const matchKeyword = keyword
          ? note.title.toLowerCase().includes(keyword.toLowerCase())
          : true;
        return matchKeyword;
      });

      setActiveNotes(filteredNotes);
    }
  }, [notes, keyword]);

  const onDeleteChangeHandler = (id: string) => {
    deleteNote(id);
    setNotes(getAllNotes());
  };

  const onArchiveChangeHandler = (id: string) => {
    archiveNote(id);
    setNotes(getAllNotes());
  };

  const onKeywordChangeHandler = (keyword: string) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <TitlePage title={getLanguage("page.home", lang as LangOption)} />
      <Actionbar
        keyword={keyword}
        onKeywordChange={onKeywordChangeHandler}
        isAddNote={true}
      />
      {loading ? (
        <Loading />
      ) : activeNotes.length > 0 ? (
        <NoteList
          initialData={activeNotes}
          onArchiveChange={onArchiveChangeHandler}
          onDeleteChange={onDeleteChangeHandler}
        />
      ) : (
        <Empty text="page.empty.note" />
      )}
    </div>
  );
};

export default HomePage;

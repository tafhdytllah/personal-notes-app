import Empty from "@/components/Empty";
import Actionbar from "@/components/layout/Actionbar";
import NoteList from "@/components/layout/NoteList";
import Loading from "@/components/Loading";
import TitlePage from "@/components/TitlePage";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotes } from "@/hooks/useNotes";
import getLanguage from "@/lib/language";
import { deleteNote, getNotes, unarchiveNote } from "@/services/NotesService";
import { Note } from "@/types/note";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ArchivePage = () => {
  const { language } = useLanguage();
  const { notes, setNotes, loading } = useNotes();
  const [archiveNote, setArchiveNote] = useState<Note[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || "",
  );

  useEffect(() => {
    const filteredNotes: Note[] = notes.filter((note) => {
      const matchKeyword = keyword
        ? note.title.toLowerCase().includes(keyword.toLowerCase())
        : true;

      const isActive = !note.archived;
      return !isActive && matchKeyword;
    });

    setArchiveNote(filteredNotes);
  }, [notes, keyword]);

  const onDeleteChangeHandler = (id: string) => {
    deleteNote(id);
    setNotes(getNotes());
  };

  const onArchiveChangeHandler = (id: string) => {
    unarchiveNote(id);
    setNotes(getNotes());
  };

  const onKeywordChangeHandler = (keyword: string) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  return (
    <div className="max-w-[80%] mx-auto grid grid-rows-[auto,1fr] gap-4 py-4">
      <TitlePage title={getLanguage("page.archive", language as LangOption)} />
      <Actionbar
        keyword={keyword}
        onKeywordChange={onKeywordChangeHandler}
        isAddNote={false}
        language={language as LangOption}
      />
      {loading ? (
        <Loading language={language as LangOption} />
      ) : archiveNote.length > 0 ? (
        <NoteList
          initialData={archiveNote}
          language={language as LangOption}
          onArchiveChange={onArchiveChangeHandler}
          onDeleteChange={onDeleteChangeHandler}
        />
      ) : (
        <Empty language={language as LangOption} text="page.empty.archive" />
      )}
    </div>
  );
};

export default ArchivePage;

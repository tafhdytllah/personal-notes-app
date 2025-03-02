import Empty from "@/components/Empty";
import Actionbar from "@/components/layout/Actionbar";
import NoteList from "@/components/layout/NoteList";
import Loading from "@/components/Loading";
import { LangOption } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/note";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ArchivePage = () => {
  const { language } = useLanguage();
  const { notes, loading } = useNotes();
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

  const onKeywordChangeHandler = (keyword: string) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  return (
    <div className="grid grid-rows-[auto,1fr] gap-4">
      <Actionbar
        keyword={keyword}
        onKeywordChange={onKeywordChangeHandler}
        isAddNote={false}
        language={language as LangOption}
      />
      {loading ? (
        <Loading language={language as LangOption} />
      ) : archiveNote.length > 0 ? (
        <NoteList initialData={archiveNote} language={language as LangOption} />
      ) : (
        <Empty language={language as LangOption} />
      )}
    </div>
  );
};

export default ArchivePage;

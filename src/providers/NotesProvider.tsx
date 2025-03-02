import { NotesContext } from "@/context/NotesContext";
import { fetchNotes } from "@/services/NotesService";
import { Note } from "@/types/note";
import { useCallback, useEffect, useMemo, useState } from "react";

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        throw new Error(`Failed to fetch notes : ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, []);

  const setNotesCallback = useCallback((notes: Note[]) => setNotes(notes), []);

  const value = useMemo(
    () => ({ notes, setNotes: setNotesCallback, loading }),
    [notes, setNotesCallback, loading],
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

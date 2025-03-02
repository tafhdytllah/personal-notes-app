import { NotesContext } from "@/context/NotesContext";
import { getAllNotes } from "@/services/NotesService";
import { Note } from "@/types/note";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const data = getAllNotes();
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

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotesProvider;

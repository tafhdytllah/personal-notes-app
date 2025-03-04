import { NotesContext } from "@/context/NotesContext";
import { NetworkData } from "@/lib/network-data";
import { Note } from "@/types/note";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const { error, data } = await NetworkData.getActiveNotes();
      if (!error && data) {
        setNotes(data);
      }
      setLoading(false);
    };

    fetchNotes();
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

import { Note } from "@/types/note";
import { createContext } from "react";

export type NotesContextState = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  loading: boolean;
}

export const NotesContext = createContext<NotesContextState | undefined>(undefined); 
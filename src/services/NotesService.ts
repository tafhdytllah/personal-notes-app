import { LocalData } from "@/lib/local-data";
import { Note } from "@/types/note";

export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const useLocalData = true;
    if (useLocalData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(LocalData.getAllNotes());
        }, 500);
      })
    }

    const response = await fetch('');
    if (!response.ok) throw new Error('Failed to fetch notes');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const createNote = async (data: Note) => {
  LocalData.addNote(data);
  return await fetchNotes();
}

export const editNote = async (data: Note) => {
  LocalData.editNote(data);
  return fetchNotes();
};
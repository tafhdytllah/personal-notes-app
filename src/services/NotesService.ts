import { LocalData } from "@/lib/local-data";
import { Note } from "@/types/note";

// export const getAllNotes = async (): Promise<Note[]> => {
//   try {
//     const useLocalData = true;
//     if (useLocalData) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(LocalData.getAllNotes());
//         }, 500);
//       })
//     }

//     const response = await fetch('');
//     if (!response.ok) throw new Error('Failed to fetch notes');
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

export const getAllNotes = () => LocalData.getAllNotes();

export const getNoteById = (id: string): Note | null => {
  const note = LocalData.getNote(id);
  if (!note) {
    console.error(`Note with id ${id} not found`);
    return null;
  }
  return note;
}

export const createNote = (data: Note) => {
  LocalData.addNote(data);
  return getAllNotes();
}

export const editNote = (data: Note) => {
  LocalData.editNote(data);
  return getAllNotes();
};

export const getActiveNotes = () => LocalData.getActiveNotes();

export const getArchivedNotes = () => LocalData.getArchivedNotes();

export const archiveNote = (id: string) => LocalData.archiveNote(id);

export const unarchiveNote = (id: string) => LocalData.unarchiveNote(id);

export const deleteNote = (id: string) => LocalData.deleteNote(id);

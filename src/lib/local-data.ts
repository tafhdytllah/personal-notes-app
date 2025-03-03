import { Note } from "@/types/note";

let notes: Note[] = [
  {
    id: 'notes-1',
    title: 'Babel',
    body: 'Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-2',
    title: 'Functional Component',
    body: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-3',
    title: 'Modularization',
    body: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-4',
    title: 'Lifecycle',
    body: 'Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-5',
    title: 'ESM',
    body: 'ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    id: 'notes-6',
    title: 'Module Bundler',
    body: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
];

const getAllNotes = (): Note[] => notes;

const getNote = (id: string): Note | null => notes.find((note) => note.id === id) ?? null;

const getActiveNotes = (): Note[] => notes.filter((note) => !note.archived) ?? [];

const getArchivedNotes = (): Note[] => notes.filter((note) => note.archived) ?? [];

const addNote = ({ title, body }: Note): void => {
  const generatedId = `notes-${+new Date()}`;
  const createdAt = new Date().toISOString() ?? "";
  console.log("createdAT : ", createdAt);

  notes = [
    ...notes,
    {
      id: generatedId,
      title: title || "(untitled)",
      body: body || "",
      createdAt: createdAt,
      archived: false
    }
  ]
}

const deleteNote = (id: string): void => {
  notes = notes.filter((note) => note.id !== id);
}

const archiveNote = (id: string): void => {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: true };
    }
    return note;
  })
}

const unarchiveNote = (id: string): void => {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: false };
    }
    return note;
  });
}

const editNote = ({ id, title, body }: Note): void => {
  notes = notes.map((note) =>
    note.id === id ? { ...note, title, body } : note
  );
};

export const LocalData = {
  getAllNotes,
  getNote,
  getActiveNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  editNote
}

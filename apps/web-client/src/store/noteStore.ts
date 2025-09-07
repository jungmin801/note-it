import { mock } from '@/constants/mock';
import { create } from 'zustand';

export type Note = {
  noteId: number;
  width: number;
  height: number;
  x: number;
  y: number;
  content: string;
  color: string;
};

interface NoteStore {
  notes: Note[];
  selectedNoteId: number | null;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (noteId: number, patch: Partial<Note>) => void;
  deleteNote: (noteId: number) => void;
  selectNote: (noteId: number | null) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: mock,
  selectedNoteId: null,
  setNotes: (notes: Note[]) => set({ notes }),
  addNote: (note: Note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),
  updateNote: (noteId, patch) =>
    set((state) => ({
      notes: state.notes.map((note) => (note.noteId === noteId ? { ...note, ...patch } : note)),
    })),
  deleteNote: (noteId) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.noteId !== noteId),
    })),
  selectNote: (noteId) => set({ selectedNoteId: noteId }),
}));

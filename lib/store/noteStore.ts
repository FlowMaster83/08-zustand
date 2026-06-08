import { create } from 'zustand';
import type { NoteTag } from '@/types/note';

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

interface Draft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()((set) => ({
  draft: initialDraft,
  setDraft: (note) => set((state) => ({ draft: { ...state.draft, ...note } })),
  clearDraft: () => set({ draft: initialDraft }),
}));

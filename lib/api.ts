import type { Note } from '../types/note';
import axios from 'axios';

import { NoteTag } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// get all notes
export const fetchNotes = async (
  search: string = '',
  page: number = 1,
  perPage: number = 12,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: { search, page, perPage, ...(tag && { tag }) },
  });
  return response.data;
};

// get one note
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

// post
export const createNote = async (data: NewNoteData): Promise<Note> => {
  const response = await api.post<Note>('/notes', data);
  return response.data;
};

// delete
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

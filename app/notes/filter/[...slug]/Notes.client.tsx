'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';

import css from './NotesPage.module.css';

type Props = {
  tag?: NoteTag;
};

export default function NotesClient({ tag }: Props) {

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [isOpenCreateNote, setIsOpenCreateNote] = useState<boolean>(false);

  const perPage = 12;
  const [debouncedFilter] = useDebounce(filter, 500);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', debouncedFilter, page, tag],
    queryFn: () => fetchNotes(debouncedFilter, page, perPage, tag),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const openModal = (): void => setIsOpenCreateNote(true);
  const closeModal = (): void => setIsOpenCreateNote(false);

  const handleSearch = (newFilter: string): void => {
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (nextPage: number): void => setPage(nextPage);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={filter} onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>{error.message}</p>}
      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

      {isOpenCreateNote && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

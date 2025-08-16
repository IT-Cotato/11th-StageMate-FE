import type {ArchiveRecord} from '@/types/archive';
import {create} from 'zustand';

interface ArchiveStore {
  records: ArchiveRecord[];
  addRecord: (record: ArchiveRecord) => void;
  updateRecord: (updatedRecord: ArchiveRecord) => void;
  removeRecord: (id: number) => void;
}
export const useArchiveStore = create<
  ArchiveStore & {setRecords: (records: ArchiveRecord[]) => void}
>((set) => ({
  records: [],
  setRecords: (records) => set({records}),
  addRecord: (record: ArchiveRecord) =>
    set((state) => ({
      records: [...state.records, record],
    })),
  updateRecord: (updatedRecord) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.id === updatedRecord.id ? updatedRecord : r
      ),
    })),
  removeRecord: (id) =>
    set((state) => ({records: state.records.filter((r) => r.id !== id)})),
}));

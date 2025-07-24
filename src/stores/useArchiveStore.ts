import {create} from 'zustand';

export interface RecordType {
  id: string; // 고유 id
  title: string;
  date: Date;
  imageUrl?: string;
  place?: string;
  casting?: string;
  rating?: number;
  review?: string;
  memo?: string;
}

interface ArchiveStore {
  records: RecordType[];
  addRecord: (record: RecordType) => void;
  updateRecord: (updatedRecord: RecordType) => void;
  removeRecord: (id: string) => void;
}

export const useArchiveStore = create<ArchiveStore>((set) => ({
  records: [],
  addRecord: (record) =>
    set((state) => ({records: [...state.records, record]})),
  updateRecord: (updatedRecord) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.id === updatedRecord.id ? updatedRecord : r
      ),
    })),
  removeRecord: (id) =>
    set((state) => ({records: state.records.filter((r) => r.id !== id)})),
}));

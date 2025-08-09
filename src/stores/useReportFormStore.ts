import {create} from 'zustand';

export interface ReportForm {
  title: string;
  description: string;
  location?: string;
  performance?: string;
  date?: Date | null;
  genre?: string[];
  url?: string;
}

const initialForm: ReportForm = {
  title: '',
  description: '',
  location: '',
  performance: '',
  date: null,
  genre: [],
  url: '',
};

interface ReportFormStore {
  form: ReportForm;
  setForm: (form: Partial<ReportForm>) => void;
  resetForm: () => void;
  setDate: (date: Date) => void;
  toggleGenre: (genre: string) => void;
}

export const useReportFormStore = create<ReportFormStore>((set) => ({
  form: initialForm,
  setForm: (form) =>
    set((state) => ({
      form: {...state.form, ...form},
    })),
  resetForm: () => set({form: initialForm}),
  setDate: (date) =>
    set((state) => ({
      form: {...state.form, date},
    })),
  toggleGenre: (genre) =>
    set((state) => {
      const prev = state.form.genre ?? [];
      const updated = prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre];
      return {
        form: {
          ...state.form,
          genre: updated,
        },
      };
    }),
}));

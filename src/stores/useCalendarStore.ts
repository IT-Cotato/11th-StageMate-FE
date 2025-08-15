import {create} from 'zustand';

interface CalendarState {
  year: number;
  month: number;
  setYearMonth: (y: number, m: number) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  setYearMonth: (year, month) => set({year, month}),
}));

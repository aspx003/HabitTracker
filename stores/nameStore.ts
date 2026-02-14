import { create } from "zustand";

interface NameStore {
  name: string;
  setName: (name: string) => void;
}

export const useNameStore = create<NameStore>((set) => ({
  name: "",
  setName: (name: string) => set({ name }),
}));

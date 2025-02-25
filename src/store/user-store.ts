import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/interfaces/user';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  userLoading: boolean;
  setUserLoading: (value: boolean) => void;
}

const userStore: StateCreator<UserStore> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  userLoading: true,
  setUserLoading: (value: boolean) => set({ userLoading: value }),
});

const useUserStore = create<UserStore>()(
  persist(userStore, {
    name: 'user-storage',
  })
);

export default useUserStore;

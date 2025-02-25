import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { Link } from '@/interfaces/link';

interface LinkStore {
  links: Link[];
  archivedLinks: Link[];
  linksLoading: boolean;
  setLinksLoading: (value: boolean) => void;
  setLinks: (links: Link[]) => void;
  setArchivedLinks: (links: Link[]) => void;
  addLink: (link: Link) => void;
  updateLink: (link: Link) => void;
  deleteLink: (id: string) => void;
  deleteLinkFromArchived: (id: string) => void;
  archiveLink: (id: string) => void;
  restoreLink: (id: string) => void;
  reorderLinks: (newOrder: string[]) => void;
}

const linkStore: StateCreator<LinkStore> = (set) => ({
  links: [],
  archivedLinks: [],
  linksLoading: true,
  setLinksLoading: (value: boolean) => set({ linksLoading: value }),
  setLinks: (links: Link[]) => set({ links }),
  setArchivedLinks: (links: Link[]) => set({ archivedLinks: links }),
  addLink: (link: Link) => set((state) => ({ links: [...state.links, link] })),
  updateLink: (link: Link) =>
    set((state) => ({
      links: state.links.map((l) => (l.id === link.id ? link : l)),
    })),
  deleteLink: (id: string) =>
    set((state) => ({
      links: state.links.filter((l) => l.id !== id),
    })),
  deleteLinkFromArchived: (id: string) =>
    set((state) => ({
      archivedLinks: state.archivedLinks.filter((l) => l.id !== id),
    })),
  archiveLink: (id: string) =>
    set((state) => {
      const linkToArchive = state.links.find((l) => l.id === id);
      if (!linkToArchive) return {};
      return {
        links: state.links.filter((l) => l.id !== id),
        archivedLinks: [
          ...state.archivedLinks,
          { ...linkToArchive, archived: true },
        ],
      };
    }),
  restoreLink: (id: string) =>
    set((state) => {
      const linkToRestore = state.archivedLinks.find((l) => l.id === id);
      if (!linkToRestore) return {};
      return {
        archivedLinks: state.archivedLinks.filter((l) => l.id !== id),
        links: [...state.links, { ...linkToRestore, archived: false }],
      };
    }),
  reorderLinks: (newOrder: string[]) =>
    set((state) => {
      const newLinks = newOrder.map((id, position) => {
        const link = state.links.find((l) => l.id === id);
        return link ? { ...link, position } : null;
      });
      return { links: newLinks.filter(Boolean) as Link[] };
    }),
});

const useLinkStore = create<LinkStore>()(
  persist(linkStore, {
    name: 'link-storage',
  })
);

export default useLinkStore;

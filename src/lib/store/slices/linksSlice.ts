import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { linksApi } from '@/lib/api/linksApi';
import { RootState } from '..';

export type Link = {
  id: string;
  label: string;
  url: string;
  visible: boolean;
  order: number;
  archived: boolean;
};

interface LinksState {
  links: Link[];
  archivedLinks: Link[];
}

const initialState: LinksState = {
  links: [],
  archivedLinks: [],
};

const { name, actions, reducer } = createSlice({
  name: 'links',
  initialState,
  reducers: {
    reorderLinks(
      state,
      action: PayloadAction<{ id: string; order: number }[]>
    ) {
      state.links = state.links
        .map((link) => {
          const newOrder = action.payload.find(
            (orderedLink) => orderedLink.id === link.id
          )?.order;
          return newOrder !== undefined ? { ...link, order: newOrder } : link;
        })
        .sort((a, b) => a.order - b.order);
    },
  },
  extraReducers: (builder) => {
    // Listener for when the getLinks endpoint is successfully completed
    builder.addMatcher(
      linksApi.endpoints.getLinks.matchFulfilled,
      (state, action) => {
        state.links = action.payload.filter((link) => !link.archived);
        state.archivedLinks = action.payload.filter((link) => link.archived);
      }
    );

    // Listener for when the createLink mutation is successfully completed
    builder.addMatcher(
      linksApi.endpoints.createLink.matchFulfilled,
      (state, action) => {
        state.links.push(action.payload);
      }
    );

    // Listener for when the updateLink mutation is successfully completed
    builder.addMatcher(
      linksApi.endpoints.updateLink.matchFulfilled,
      (state, action) => {
        const linkId = action.meta.arg.originalArgs.id;
        const updatedLink = action.meta.arg.originalArgs.updatedLink;

        // If the link is not archived, update it in the links array
        // if it is archived, update it in the archivedLinks array
        if (updatedLink.archived) {
          state.links = state.links.filter((link) => link.id !== linkId);
          state.archivedLinks = state.archivedLinks.map((link) =>
            link.id === linkId ? { ...link, ...updatedLink } : link
          );
        } else {
          state.links = state.links.map((link) =>
            link.id === linkId ? { ...link, ...updatedLink } : link
          );
          state.archivedLinks = state.archivedLinks.filter(
            (link) => link.id !== linkId
          );
        }
      }
    );

    // Listener for when the deleteLink mutation is successfully completed
    builder.addMatcher(
      linksApi.endpoints.deleteLink.matchFulfilled,
      (state, action) => {
        const linkId = action.meta.arg.originalArgs;

        state.links = state.links.filter((link) => link.id !== linkId);
        state.archivedLinks = state.archivedLinks.filter(
          (link) => link.id !== linkId
        );
      }
    );

    // Listener for when the archiveLink mutation is successfully completed
    builder.addMatcher(
      linksApi.endpoints.archiveLink.matchFulfilled,
      (state, action) => {
        const linkId = action.meta.arg.originalArgs;
        const link = state.links.find((link) => link.id === linkId);

        if (link) {
          link.archived = true;
          state.archivedLinks.push(link);
          state.links = state.links.filter((link) => link.id !== linkId);
        }
      }
    );

    // Listener for when the restoreLink mutation is successfully completed
    builder.addMatcher(
      linksApi.endpoints.restoreLink.matchFulfilled,
      (state, action) => {
        const linkId = action.meta.arg.originalArgs;
        const link = state.archivedLinks.find((link) => link.id === linkId);

        if (link) {
          link.archived = false;
          state.links.push(link);
          state.archivedLinks = state.archivedLinks.filter(
            (link) => link.id !== linkId
          );
        }
      }
    );

    // Listener for when the reorderLinks mutation is successfully completed
    // builder.addMatcher(
    //   linksApi.endpoints.reorderLinks.matchFulfilled,
    //   (state, action) => {
    //     const orderedLinks = action.meta.arg.originalArgs.orderedLinks;

    //     state.links = state.links
    //       .map((link) => {
    //         const newOrder = orderedLinks.find(
    //           (orderedLink) => orderedLink.id === link.id
    //         )?.order;
    //         return newOrder !== undefined ? { ...link, order: newOrder } : link;
    //       })
    //       .sort((a, b) => a.order - b.order);
    //   }
    // );
  },
});

export default reducer;

export const { reorderLinks } = actions;

const sliceSelector = (state: RootState) => state[name] || initialState;

export const selectLinks = createSelector(
  sliceSelector,
  (state) => state.links
);

export const selectArchivedLinks = createSelector(
  sliceSelector,
  (state) => state.archivedLinks
);

export const selectLinkById = createSelector(
  sliceSelector,
  (state) => (id: string) =>
    state.links.find((link) => link.id === id) ||
    state.archivedLinks.find((link) => link.id === id)
);

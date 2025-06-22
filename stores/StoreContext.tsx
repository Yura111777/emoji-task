'use client';

import { createContext, useContext } from 'react';
import { emojiStore } from './EmojiStore';

const store = {
    emojiStore,
};

const StoreContext = createContext(store);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

'use client';

import { makeAutoObservable, reaction } from 'mobx';

export interface EmojiEntry {
    emoji: string | null;
    text: string | null | undefined;
    dayType?: string | null | undefined;
}
const STORAGE_KEY = 'emoji_store_entries';

class EmojiStore {
    entries: EmojiEntry[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    init() {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                this.entries = JSON.parse(stored);
            } catch (e) {
                console.error('Помилка парсингу:', e);
            }
        }

        reaction(
            () => this.entries.slice(),
            entries => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
            }
        );
    }
    setEmoji(emoji: string | null, text?: string | null, dayType?: string | null) {
        this.entries.push({
            emoji,
            text,
            dayType,
        });
    }

    removeEntry(index: number) {
        this.entries.splice(index, 1);
    }
}

export const emojiStore = new EmojiStore();

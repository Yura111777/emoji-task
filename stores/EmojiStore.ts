'use client';

import { makeAutoObservable, reaction } from 'mobx';

export interface EmojiEntry {
    emoji: string | null;
    text: string | null | undefined;
    dayType?: string | null | undefined;
    id: string;
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
    setEmoji(id: string, emoji: string | null, text?: string | null, dayType?: string | null) {
        this.entries.push({
            emoji,
            text,
            dayType,
            id,
        });
    }

    removeEntry(id: string) {
        this.entries = this.entries.filter(entry => entry.id !== id);
    }

    moveEntry(fromIndex: number, toIndex: number) {
        const updated = [...this.entries];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        this.entries = updated;
    }
}

export const emojiStore = new EmojiStore();

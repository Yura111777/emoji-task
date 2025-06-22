'use client';

import Image from 'next/image';
import CardListItem from '@/app/ui/card-list-item';
import Modal from '@/app/ui/modal';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/StoreContext';
import { useEffect, useState } from 'react';

const Home = observer(() => {
    const { emojiStore } = useStore();
    useEffect(() => {
        emojiStore.init(); // тільки в браузері
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header>
                <Modal></Modal>
            </header>
            <main className="flex w-full flex-row flex-wrap gap-[32px] row-start-2 items-center justify-center sm:items-start">
                {emojiStore.entries.map((entry, index) => (
                    <CardListItem
                        key={index}
                        cardText={entry.text || ''}
                        emoji={entry.emoji || ''}
                        timeClass={entry.dayType}
                        index={index}
                    />
                ))}
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
});
export default Home;

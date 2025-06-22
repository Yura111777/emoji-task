'use client';

import Image from 'next/image';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CardListItem from '@/app/ui/card-list-item';
import Modal from '@/app/ui/modal';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/StoreContext';
import { useEffect, useState } from 'react';

const SortableItem = ({ entry, index }: { entry: any; index: number }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <CardListItem
                key={index}
                cardText={entry.text || ''}
                emoji={entry.emoji || ''}
                timeClass={entry.dayType}
                index={index}
            />
        </div>
    );
};

const Home = observer(() => {
    const { emojiStore } = useStore();
    useEffect(() => {
        emojiStore.init(); // тільки в браузері
    }, []);
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            emojiStore.moveEntry(active.id, over.id);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header>
                <Modal></Modal>
            </header>
            <main className="flex w-full flex-row flex-wrap gap-[32px] row-start-2 items-center justify-center sm:items-start">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={emojiStore.entries.map((_, i) => i)}
                        strategy={verticalListSortingStrategy}
                    >
                        {emojiStore.entries.map((entry, index) => (
                            <SortableItem key={index} entry={entry} index={index} />
                        ))}
                    </SortableContext>
                </DndContext>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
});
export default Home;

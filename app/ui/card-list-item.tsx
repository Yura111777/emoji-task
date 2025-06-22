'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/stores/StoreContext';

export default function CardListItem({
    cardText,
    emoji,
    timeClass,
}: {
    cardText: string | null | undefined;
    emoji: string | null;
    timeClass: string | null | undefined;
}) {
    const { emojiStore } = useStore();

    return (
        <div className="card w-full  p-2">
            <div className="card-body p-3 relative rounded-2xl shadow-md overflow-hidden sm:min-h-[480px] flex sm:flex-col sm:justify-center items-center text-4xl font-bold sm:text-white">
                <div
                    className={`sm:absolute w-1/4 h-[100px] sm:w-full sm:h-auto inset-0 opacity-60 ${timeClass}:bg-${timeClass}  bg-cover bg-center`}
                ></div>
                <div className="z-10 sm:text-[100px] text-[44px]">{emoji}</div>
                <div className="card-footer z-10 mt-4 text-base sm:text-lg text-center px-4">
                    {cardText}
                </div>
            </div>
        </div>
    );
}

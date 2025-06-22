'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/stores/StoreContext';

export default function CardListItem({
    cardText,
    emoji,
    timeClass,
    index,
}: {
    cardText: string | null | undefined;
    emoji: string | null;
    timeClass: string | null | undefined;
    index: number;
}) {
    const { emojiStore } = useStore();

    return (
        <div className="card w-full sm:w-1/3 md:w-1/3 lg:w-1/6 p-2">
            <div className="card-body p-3 relative rounded-2xl shadow-md overflow-hidden sm:min-h-[480px] flex sm:flex-col sm:justify-center items-center text-4xl font-bold sm:text-white">
                <div
                    className={`sm:absolute w-1/4 h-[100px] sm:w-full sm:h-auto inset-0 opacity-60 ${timeClass}:bg-${timeClass}  bg-cover bg-center`}
                ></div>
                <div className="z-10 sm:text-[100px] text-[44px]">{emoji}</div>
                <div className="card-footer z-10 mt-4 text-base sm:text-lg text-center px-4">
                    {cardText}
                </div>
                <button
                    className="btn w-[30px]  absolute top-[10px] right-[10px] cursor-pointer hover:bg-gray-300 rounded p-1"
                    onClick={() => emojiStore.removeEntry(index)}
                >
                    <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 105.16 122.88"
                    >
                        <title>delete</title>
                        <path
                            fill="red"
                            className="cls-1"
                            d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

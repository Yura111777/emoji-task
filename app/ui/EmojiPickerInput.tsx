'use client';

import { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

export default function EmojiPickerInput({
    onEmojiSelect,
}: {
    onEmojiSelect: (emoji: string) => void;
}) {
    const [showPicker, setShowPicker] = useState(false);

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        onEmojiSelect(emojiData.emoji); // Передаємо вибране емоджі як проп
        setShowPicker(false); // Закриваємо пікер після вибору
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowPicker(prev => !prev)}
                className="px-3 cursor-pointer py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
                😊 Обрати емоджі
            </button>

            {showPicker && (
                <div className="z-10 mt-2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}

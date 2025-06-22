'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import EmojiPickerInput from './EmojiPickerInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/StoreContext';

export default function Modal() {
    const [open, setOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [comment, setComment] = useState<string | null>(null);
    const [validation, setValidation] = useState<boolean>(false);
    const [timeClass, setTimeClass] = useState<'morning' | 'day' | 'night'>('day');
    const { emojiStore } = useStore();
    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour <= 12) setTimeClass('morning');
        else if (currentHour >= 18) setTimeClass('night');
        else setTimeClass('day');
    }, []);
    const submit = () => {
        if (selectedEmoji) {
            const id = generateIdByTime();
            emojiStore.setEmoji(id, selectedEmoji, comment, timeClass);
            setOpen(false);
            setValidation(false);
        } else {
            setValidation(true);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };
    const openModal = () => {
        setOpen(true);
        setSelectedEmoji(null);
        setComment(null);
    };

    const closeModal = () => {
        setOpen(false);
        setSelectedEmoji(null);
        setComment(null);
        setValidation(false);
    };

    const generateIdByTime = (): string => {
        return Math.floor(Date.now() / 1000).toString();
    };
    return (
        <div>
            <button
                onClick={() => openModal()}
                className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
            >
                Створіть Емоцію
            </button>
            <Dialog open={open} onClose={closeModal} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            className="text-base font-semibold text-gray-900"
                                        >
                                            <EmojiPickerInput onEmojiSelect={setSelectedEmoji} />
                                            <div className="text-xl">
                                                Вибране емоджі:{' '}
                                                <span className="text-3xl">
                                                    {selectedEmoji || '🙈 (нічого)'}
                                                </span>
                                            </div>
                                            {!selectedEmoji?.length && validation ? (
                                                <div
                                                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                                    role="alert"
                                                >
                                                    <span className="font-medium">
                                                        Оберіть емодзі
                                                    </span>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <textarea
                                                className="w-full min-h-[100px] rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                                                placeholder="Добоавте коментар"
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => submit()}
                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                                >
                                    Створити
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => closeModal()}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Відмінити
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

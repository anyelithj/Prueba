import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { clearHistory, fetchWordMeaning } from '@/store/dictionarySlice';
import { useState } from 'react'

const HistoryModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { history } = useAppSelector(state => state.dictionary);
    const dispatch = useAppDispatch();

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };
    const handleWordClick = (word: string) => {
        dispatch(fetchWordMeaning(word));
        setIsOpen(false);
    };

    const handleClearHistory = () => {
        dispatch(clearHistory());
    };

    if (history.length === 0 && isOpen) {
        setIsOpen(false);
        return null;
    }

    return (
        <>
            {history.length > 0 && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="mt-4 text-purple hover:underline focus:outline-none focus:ring-1 focus: ring-purple rounded px-2 flex items-center"
                >
                    <svg className="mr-1" width="16" height="16" viewBox="0 0 16 16" fill="#A445ED">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" />
                        <path d="M8 3.5a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h2.5a.75.75 0 0 0 0-1.5H8.75V4.25A.75.75 0 0 0 8 3.5z" />
                    </svg>
                    Search History ({history.length})
                </button>
            )}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-500 w-full max-w-lg mx-4 rounded-lg p-6 max-h-[80vh] overflow-y-auto">
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className="text-xl font-bold">Search History</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 hover:text-gray-700 dark:hover:text-white"
                                aria-label="Close"
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                    <path d="M10.41 9l7.29-7.29a1 1 0 0 0-1.41-1.41L9 7.59 1.71.29A1 1 0 0 0 .29 1.71L7.59 9 .29 16.29a1 1 0 0 0 1.42 1.41L9 10.41l7.29 7.29a1 1 0 1 0 1.41-1.41L10.41 9z" />
                                </svg>
                            </button>
                        </div>
                        <ul className='divede-y divide-gray-200 dark:divide-gray-400'>
                            {history.map((item, index) => (
                                <li key={index} className='py-3'>
                                    <button
                                        onClick={() => handleWordClick(item.word)}
                                        className="w-full text-left hover.bg-gray-100 dark:hover:bg-gray-600 p-2 rounded transition-colors"
                                    >
                                        <p className="font-bold text-lg">{item.word}</p>
                                        <p className="text-sm text-gray-300">{formatDate(item.timestamp)}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-400 flex justify-end">
                            <button onClick={handleClearHistory} className="text-red hover:underline focus:outline-none focus:ring-2 focus:ring-red rounded px-2">
                                Clear History
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HistoryModal

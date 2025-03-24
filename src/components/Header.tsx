import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setFont, setMode } from '@/store/themeSlice';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const { font, mode } = useAppSelector(state => state.theme);

    return (
        <header className='w-full max-w-3xl flex justify-between items-center py-4'>
            <div className='text-2xl font-bold'>
                <svg xmlns='http://www.w3.org/2000/svg' width="34" height="38" viewBox="0 0 34 38">
                    <g fill='none' fillRule='evenodd' stroke='#838383' strokeLinecap='round' strokeWidth='1.5' >
                        <path d='M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28' />
                        <path strokeLinejoin='round' d='M5 37a4 4 0 1 1 0-8' />
                        <path d='M11 9h12M11 15h12M11 21h12' />
                    </g>
                </svg>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex items-center space-x-4'>
                    <div className='relative border-r pr-4 dark:border-gray-400'>
                        <select
                            value={font}
                            onChange={(e) => dispatch(setFont(e.target.value as "serif" | "sans" | "mono"))}
                            className='appearance-none bg-transparent pr-6 focus:outline-none cursor-pointer'>
                            <option value="serif">Serif</option>
                            <option value="sans">Sans Serif</option>
                            <option value="mono">Mono</option>
                        </select>
                        <svg
                            className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'
                            width='14'
                            height='8'
                            viewBox='0 0 14 8'
                        >
                            <path fill='none' stroke='#A445ED' strokeWidth='1.5' d='m1 1 6 6 6-6' />
                        </svg>
                    </div>
                </div>
                <button
                    onClick={() => dispatch(setMode(mode === "light" ? "dark" : "light"))}
                    aria-label='Toggle dark mode'
                    className='flex items-center p-2 rounded-md border-none text-lg'
                >
                    <div className='w-10 h-5 bg-gray-300 dark:bg-purple rounded-full p-1 flex items-center transition-colors'>
                        <div className='bg-white w-3 h-3 rounded-full transform translate-x-0 dark:translate-x-5 transition-transform'></div>
                    </div>
                    <svg className='ml-3' width='20' height='20' viewBox='0 0 22 22'>
                        <path
                            fill='none'
                            stroke={mode === 'dark' ? '#A445ED' : '#757575'}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z'
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header

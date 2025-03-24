import { useAppDispatch } from "@/hooks/redux"
import { clearError, fetchWordMeaning, setCurrentWord, setCustomError } from "@/store/dictionarySlice";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const SearchBox: React.FC = () => {
    const dispatch = useAppDispatch();
    const [showError, SetShowError] = useState(false);
    const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const formik = useFormik({
        initialValues: {
            word: '',
        },
        validationSchema: Yup.object({
            word: Yup.string().required("Whoops, can't be empty...")
        }),
        onSubmit: values => {
            const word = values.word.trim();
            if (word !== '') {
                if (!/^[a-zA-Z]+$/.test(word)) {
                    dispatch(setCurrentWord(word));
                    dispatch(setCustomError('Please enter alphabetic characters only'));
                    return;
                }
                dispatch(setCurrentWord(word));
                dispatch(fetchWordMeaning(word));
            } else {
                dispatch(setCurrentWord(''));
                dispatch(clearError());
            }
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        if (e.target.value.trim() === '') {
            dispatch(setCurrentWord(''));
            dispatch(clearError());
        }
        SetShowError(true);
        if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        formik.handleBlur(e);

        if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
        }

        errorTimeoutRef.current = setTimeout(() => {
            SetShowError(false);
        }, 3000);
    }

    useEffect(() => {
        return () => {
            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current);
            }
        };
    }, []);

    const handleSearchIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (formik.values.word.trim() === '') {
            e.preventDefault();
            formik.setFieldTouched('word', true, true);
            SetShowError(true);

            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current);
            }
            errorTimeoutRef.current = setTimeout(() => {
                SetShowError(false);
            }, 3000)
        }
    };
    return (
        <form onSubmit={formik.handleSubmit} className="w-full mt-8">
            <div className="relative">
                <input
                    type="text"
                    name="word"
                    placeholder="Search for any word..."
                    className={`w-full py-4 px-6 bg-gray-100 dark:bg-gray-100 
                         rounded-2xl font-bold text-lg 
                         text-gray-800 dark:text-gray-800
                         placeholder-gray-700 dark:placeholder-gray-500
                         transition-all duration-200 
                         hover:bg-gray-50 dark:hover:bg-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-[#A445ED]
                         ${formik.touched.word && formik.errors.word && showError ? 'border-2 border-red' : 'border-2 border-transparent'}`}
                    value={formik.values.word}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
                <button
                    type="submit"
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 
                        p-2 rounded-full 
                        transition-all duration-200 
                        hover:bg-gray-200
                        focus:outline-none focus:border-none
                        active:outline-none active:border-none
                        focus-visible:outline-none focus-visible:border-none
                        focus:ring-0"
                    aria-label="Search"
                    onClick={handleSearchIconClick}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path fill="none" stroke="#A445ED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z" />
                    </svg>
                </button>
            </div>
            {formik.touched.word && formik.errors.word && showError && (
                <div className="text-red text-sm mt-2">{formik.errors.word}</div>
            )}
        </form>
    );
};

export default SearchBox

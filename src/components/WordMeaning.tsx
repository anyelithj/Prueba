import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { clearError } from "@/store/dictionarySlice";
import { useEffect, useRef } from "react"
import Loading from "./Loading";

const WordMeaning: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error, currentWord } = useAppSelector(state => state.dictionary)
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!currentWord || currentWord.trim() === '') {
      dispatch(clearError());
    }
  }, [currentWord, dispatch]);

  if (!currentWord || currentWord.trim() === '') {
    return null;
  }

  if (loading) {
    return <div className="mt-8 text-center"><Loading/></div>
  }
  if (error) {
    return (
      <div className="mt-16 flex flex-col items-center text-center">
        <span className="text-6xl mb-6">😒</span>
        <h2 className="text-xl font-bold mb-4">No definitions Found</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {error}.Please try another word or check your spelling.
        </p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const audioFile = data.phonetics.find(p => p.audio && p.audio.trim() !== '')?.audio || '';

  const playAudio = () => {
    if (audioRef.current && audioFile) {
      audioRef.current.play();
    }
  }
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold mb-2">{data.word}</h1>
          <p className="text-purple-700 text-lg">{data.phonetics.find(p => p.text)?.text || ''}</p>
        </div>
        {audioFile && (
          <>
            <button
              onClick={playAudio}
              className="w-12 h-12 bg-purple bg-opacity-20 rounded-full
           flex items-center justify-center hover:bg-opacity-30 
           transition-colors focus:outline-none focus:right-2 focus:ring-purple-700 focus:ring-opacity-50"
              aria-label="Play pronunciation"
            >
              <svg xmlns="http://www.W3.org/2000/svg" width="61" height="61" viewBox="0 0 75 75">
                <g fill="#A445ED" fillRule="evenodd">
                  <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                  <path d="M29 27v21l21-10.5z" />
                </g>
              </svg>
            </button>
            <audio ref={audioRef} src={audioFile} />
          </>
        )}
      </div>
      {data.meanings.map((meaning, index) => (
        <div key={index} className="mt-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl italic font-bold">
              {meaning.partOfSpeech}
            </h2>
            <hr className="flex-grow border-gray-200 dark:border-gray-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-gray-500 mb-2">Meaning</h3>
            <ul className="list-disc list-outside pl-5 space-y-3">
              {meaning.definitions.map((def, idx) => (
                <li key={idx} className="text-base">
                  <p>{def.definition}</p>
                  {def.example && (
                    <p className="text-gray-500 mt-2">"{def.example}"</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {meaning.synonyms.length > 0 && (
            <div className="mt-6 flex">
              <h3 className="text-gray-500 mr-6">Synonyms</h3>
              <div className="flex flex-wrap gap-2">
                {meaning.synonyms.map((synonym, idx) => (
                  <span key={idx} className="text-purple-700 font-bold hover:underline cursor-pointer transition-colors focus:outline-none focus:right-2 focus:ring-purple focus:ring-opacity-50 focus:rounded px-1">{synonym}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      ))}
      {data.sourceUrls && data.sourceUrls.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-400">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-gray-500 text-sm">Source</h3>
            <a
              href={data.sourceUrls[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline flex items-center transition-colors hover:text-purple focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-50 focus:rounded px-1"
            >
              {data.sourceUrls[0]}
              <svg className="ml-2" width="14" viewBox="0 0 14 14">
                <path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272 7.272m0 0H9m3.636 0V3.636" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default WordMeaning

interface WordPhoneticsProps {
  word: string;
  phonetics: any[];
  playAudio: (url: string) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const WordPhonetics: React.FC<WordPhoneticsProps> = ({ word, phonetics, playAudio, audioRef }) => {
  return (
    <div className="text-black text-center mt-9 bg-amber-100 p-1 rounded-xl w-[50%] mx-auto">
      <div className="font-bold text-2xl m-3 border-2 border-black p-5 rounded-xl">
        <h2 className="font-bold flex flex-col items-center gap-3">
          {word}
          <audio ref={audioRef} />

          <div className="flex flex-col flex-wrap justify-center gap-3 mt-3">
            {phonetics
              .filter((p) => p.audio && p.audio.trim() !== "")
              .map((p, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    onClick={() => playAudio(p.audio)}
                    className="bg-green-600 text-white px-2 py-1 rounded-xl hover:bg-green-800"
                  >
                    🔊
                  </button>
                  {p.text && <span className="italic text-gray-800">{p.text}</span>}
                </div>
              ))}
          </div>
        </h2>
      </div>
    </div>
  );
};

export default WordPhonetics;

import { useState, useRef } from "react";
import axios from "axios";

const Defination = () => {
    const [word, setWord] = useState("");
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fetch meaning + audio
    const getDefinition = async () => {
        if (!word) return;
        try {
            setError("");
            const response = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            setData(response.data[0]); // use the first entry
            console.log(response.data[0]);
        } catch (err) {
            setError("Word not found. Try another one!");
            setData(null);
        }
    };

    // Play selected audio
    const playAudio = (url: string) => {
        if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.play();
        }
    };

    return (
        <>
            {/* Search Section */}
            <div className="text-black text-center mt-9 bg-amber-100 p-1 rounded-xl w-[50%] mx-auto">
                <div className="text-2xl m-3 border-2 border-black p-5 rounded-xl">
                    <h2 className="font-bold">What word piques your interest?</h2>

                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder="Search..."
                        className="border-2 border-black p-1 rounded text-center"
                    />

                    <button
                        onClick={getDefinition}
                        className="bg-amber-600 text-white p-1 m-2 rounded-xl cursor-pointer hover:bg-amber-800"
                    >
                        Search
                    </button>

                    <p className="text-sm">Suggested: cat, tree, code, sun...</p>
                </div>
            </div>

            {/* Result Section */}
            {data && (
                <>
                    {/* Word + Phonetics + Audio */}
                    <div className="text-black text-center mt-9 bg-amber-100 p-1 rounded-xl w-[50%] mx-auto">
                        <div className="font-bold text-2xl m-3 border-2 border-black p-5 rounded-xl">
                            <h2 className="font-bold flex flex-col items-center gap-3">
                                {data.word}

                                {/* hidden audio element */}
                                <audio ref={audioRef} />

                                {/* show all phonetics with audio */}
                                <div className="flex flex-col flex-wrap justify-center gap-3 mt-3">
                                    {data.phonetics
                                        .filter((p: any) => p.audio && p.audio.trim() !== "")
                                        .map((p: any, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2  "
                                            >
                                                {p.audio && (
                                                    <button
                                                        onClick={() => playAudio(p.audio)}
                                                        className=" text-white px-2 py-1 rounded-xl "
                                                    >
                                                        🔊
                                                    </button>
                                                )}
                                                {p.text && (
                                                    <span className="italic text-gray-800">
                                                        {p.text}
                                                    </span>
                                                )}

                                            </div>
                                        ))}
                                </div>
                            </h2>
                        </div>
                    </div>

                    {/* Definitions */}
                    <div className="text-black text-center mt-9 bg-amber-100 p-1 rounded-xl w-[50%] mx-auto">
                        <div className="m-3 border-2 border-black p-5 rounded-xl text-left">
                            <h3 className="text-xl font-bold mb-3">Definitions:</h3>
                            {data.meanings.map((meaning: any, mIndex: number) => (
                                <div key={mIndex} className="mb-4">
                                    <p className="font-semibold italic">
                                        {meaning.partOfSpeech}
                                    </p>
                                    <ul className="list-disc list-inside ml-3">
                                        {meaning.definitions.map(
                                            (def: any, dIndex: number) => (
                                                <li key={dIndex} className="text-lg">
                                                    {def.definition}
                                                    {def.example && (
                                                        <p className="text-sm text-gray-700 italic">
                                                            Example: {def.example}
                                                        </p>
                                                    )}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Error */}
            {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </>
    );
};

export default Defination;

import { useState, useRef } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import WordPhonetics from "./WordPhonetics";
import PartOfSpeech from "./PartOfSpeech";
import Image from "./Image";

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
      console.log(response.data[0]);
      setData(response.data[0]);
    } catch {
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

  const partsOfSpeech = ["noun", "verb", "adjective", "adverb"];

  return (
    <>
      <SearchBar word={word} setWord={setWord} getDefinition={getDefinition} />

      {data && (
        <>
          <WordPhonetics
            word={data.word}
            phonetics={data.phonetics}
            playAudio={playAudio}
            audioRef={audioRef}
          />

          {partsOfSpeech.map((pos) => (
            <PartOfSpeech key={pos} pos={pos} meanings={data.meanings} />
          ))}
          <Image word={data.word} />
        </>
      )}

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </>
  );
};

export default Defination;

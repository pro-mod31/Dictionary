import DefinitionList from "./DefinitionList";

interface PartOfSpeechProps {
  pos: string;
  meanings: any[];
}

const PartOfSpeech: React.FC<PartOfSpeechProps> = ({ pos, meanings }) => {
  const filtered = meanings.filter((meaning) => meaning.partOfSpeech === pos);
  if (filtered.length === 0) return null;

  return (
    <div className="text-black text-center mt-9 bg-amber-100 p-1 rounded-xl w-[50%] mx-auto">
      <div className="m-3 border-2 border-black p-5 rounded-xl text-left">
        <h3 className="text-xl font-bold mb-3 capitalize">{pos}s:</h3>
        {filtered.map((meaning, mIndex) => (
          <DefinitionList key={mIndex} definitions={meaning.definitions} />
        ))}
      </div>
    </div>
  );
};

export default PartOfSpeech;

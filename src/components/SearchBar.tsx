interface SearchBarProps {
  word: string;
  setWord: (value: string) => void;
  getDefinition: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ word, setWord, getDefinition }) => {
  return (
    <div className="text-black text-center mt-9 bg-[var(--primary-color)] p-1 rounded-xl w-[80%] md:w-[70%] mx-auto">
      <div className="text-xl md:text-2xl m-3 border-2 border-black p-5 rounded-xl">
        <h2 className="font-bold">What word piques your interest?</h2>

        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Search..."
          className="border-2 border-black p-1 rounded text-center w-full sm:w-auto"
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
  );
};

export default SearchBar;

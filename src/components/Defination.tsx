
const Defination = () => {
  return (
   <div className="text-black text-center mt-9 bg-amber-100 p-3 rounded-xl w-[70%] mx-auto">
    <div className="font-bold text-2xl m-3">
        <h2 className="text-bold">What word piques your interest?</h2>
    </div>
     <input type="text"
        placeholder="Search..."
        className="border-2 border-black p-1 rounded text-center"
        />
      <button className="bg-amber-600 text-white p-1 m-2 rounded-xl cursor-pointer hover:bg-amber-800">
            Search
        </button>
        <p className="text-sm">Suggested concepts: cat, tree, code, sun...</p>

   </div>
  );
}

export default Defination;

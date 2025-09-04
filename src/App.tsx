import Defination from "./components/Defination"


function App() {

  return (
    <>
      <div className="min-h-screen bg-cover bg-center items-center justify-center"
        style={{ backgroundImage: "url('/dic.png')" }}>
        <div className="">
          <h2 className="font-bold text-7xl text-center m-3 text-amber-700">
            Dictonary
          </h2>
          <Defination />
        </div>
      </div>
    </>
  )
}

export default App 
import SearchBox from "./SearchBox"

function Navbar() {
  return (
    <header>
        <nav className="card flex items-center justify-between gap-4 p-4">
            <div className="text-2xl font-semibold w-1/2"><h2>Keeper</h2></div>
            <div className="w-1/2">
                <SearchBox/>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
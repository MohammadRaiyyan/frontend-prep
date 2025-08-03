import useDebounce from "../../hooks/useDebounce";
import { useTodoStore } from "../store";

function SearchBox() {
  const setSearch = useTodoStore((state) => state.setSearch);
  const { state, setState } = useDebounce(setSearch);
  return (
    <div>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Search todo..."
        type="text"
        className="w-full"
      />
    </div>
  );
}

export default SearchBox;

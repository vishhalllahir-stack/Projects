import "./7-2-Accessories.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <>
      {/* Center - Search */}
      <div className="accSearchBox">
        <input
          type="text"
          placeholder="Search by part name, part number"
          className="accSearchInput"
        />

        <button className="accSearchBtn">
          <FaSearch />
        </button>
      </div>
    </>
  );
}

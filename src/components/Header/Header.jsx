import { MdLocationOn } from "react-icons/md";

function Header() {
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon" />
          <input
            type="text"
            name="destination"
            id="destination"
            className="headerSearchInput"
            placeholder="where to go"
          />
        </div>
        <div className="headerSearchItem"></div>
        <div className="headerSearchItem"></div>
        <div className="headerSearchItem"></div>
      </div>
    </div>
  );
}

export default Header;

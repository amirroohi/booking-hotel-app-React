import { HiBookmark, HiTrash } from "react-icons/hi";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    // console.log(id);
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>
        <span>
          <HiBookmark />
        </span>
        Bookmark component
      </h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Bookmark;

import { useEffect } from "react";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const { isLoading, currentBookmark, getBookmark } = useBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  console.log(currentBookmark);

  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="btn btn--back"
        style={{ marginBottom: "1rem" }}
      >
        &larr; Back
      </button>
      <div className={`bookmarkItem`}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;{" "}
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}
export default SingleBookmark;

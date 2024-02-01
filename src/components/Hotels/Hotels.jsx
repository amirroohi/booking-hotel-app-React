import { Link, useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { MdEuroSymbol } from "react-icons/md";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `host_location_like=${destination || ""}&accommodates_gte=${room || 1}`
  );
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="searchList">
      <h2>Search Results ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lgn=${item.longitude}`}
          >
            <div className="searchItem">
              <img src="" alt="" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;

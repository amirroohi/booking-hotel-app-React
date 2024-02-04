import { Link } from "react-router-dom";

import Loader from "../Loader/Loader";
import { MdEuroSymbol } from "react-icons/md";
import { useHotels } from "../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels } = useHotels();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="searchItem">
              <img src={item.picture_url.url} alt={item.name} loading="lazy" />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  <MdEuroSymbol />
                  {item.price}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;

import { MdEuroSymbol } from "react-icons/md";
import useFetch from "../../hooks/useFetch";

export default function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  // console.log(data);
  return (
    <div className="nearbyLocation">
      <h2 className="">Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div key={item.id} className="locationItem">
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
          );
        })}
      </div>
    </div>
  );
}

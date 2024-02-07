import Map from "../Map/Map";

export default function Bookmark() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        {/* <Outlet /> */}
        <div>Bookmark</div>
      </div>
      <Map markerLocations={[]} />
    </div>
  );
}

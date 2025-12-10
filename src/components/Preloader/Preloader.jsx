import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="circle-preloader"></div>
        <p className="preloader__text">Searching for coffee shops...</p>
      </div>
    </div>
  );
}

export default Preloader;

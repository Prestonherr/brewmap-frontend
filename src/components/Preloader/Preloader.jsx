import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="preloader__circle"></div>
        <p className="preloader__text">Brewing...</p>
      </div>
    </div>
  );
}

export default Preloader;

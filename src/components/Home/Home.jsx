import { useRef, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import CoffeeShopList from "../CoffeeShopList/CoffeeShopList";
import BackToTop from "../BackToTop/BackToTop";
import "./Home.css";

function Home({
  coffeeShops,
  isLoading,
  error,
  lastSearchLocation,
  onSearch,
  onUseLocation,
}) {
  const resultsRef = useRef(null);

  useEffect(() => {
    if (isLoading && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isLoading]);

  return (
    <main className="home">
      <SearchForm onSearch={onSearch} onUseLocation={onUseLocation} />
      <div ref={resultsRef}>
        {lastSearchLocation && (
          <div className="home__results-header">
            <div className="home__results-container">
              <p className="home__results-text">
                Results for: <strong>{lastSearchLocation}</strong>
              </p>
            </div>
          </div>
        )}
        <CoffeeShopList
          coffeeShops={coffeeShops}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {(coffeeShops.length > 0 || error) && <BackToTop />}
    </main>
  );
}

export default Home;

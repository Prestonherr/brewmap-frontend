import { useState, useEffect } from "react";
import CoffeeShopCard from "../CoffeeShopCard/CoffeeShopCard";
import Pagination from "../Pagination/Pagination";
import Preloader from "../Preloader/Preloader";
import CoffeeShopModal from "../CoffeeShopModal/CoffeeShopModal";
import { RESULTS_PER_PAGE } from "../../config/constants.js";
import "./CoffeeShopList.css";

function CoffeeShopList({ coffeeShops, isLoading, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [coffeeShops]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <section className="coffee-shop-list">
        <div className="coffee-shop-list__container">
          <p className="coffee-shop-list__error">{error}</p>
        </div>
      </section>
    );
  }

  if (!coffeeShops || coffeeShops.length === 0) {
    return (
      <section className="coffee-shop-list">
        <div className="coffee-shop-list__container">
          <p className="coffee-shop-list__message">
            No coffee shops found. Try adjusting your search criteria.
          </p>
        </div>
      </section>
    );
  }

  const totalPages = Math.ceil(coffeeShops.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const currentShops = coffeeShops.slice(startIndex, endIndex);

  return (
    <>
      <section className="coffee-shop-list">
        <div className="coffee-shop-list__container">
          <h2 className="coffee-shop-list__title">
            Found {coffeeShops.length} Coffee Shop
            {coffeeShops.length !== 1 ? "s" : ""}
            {totalPages > 1 && (
              <span className="coffee-shop-list__page-info">
                {" "}
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </h2>
          <div className="coffee-shop-list__grid">
            {currentShops.map((shop, index) => (
              <CoffeeShopCard
                key={shop.id || startIndex + index}
                coffeeShop={shop}
                onClick={() => {
                  setSelectedCoffeeShop(shop);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <CoffeeShopModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCoffeeShop(null);
        }}
        coffeeShop={selectedCoffeeShop}
      />
    </>
  );
}

export default CoffeeShopList;

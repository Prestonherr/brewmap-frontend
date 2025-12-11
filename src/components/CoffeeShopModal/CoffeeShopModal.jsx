import { useEffect } from "react";
import coffeeLogo from "../../images/coffee-logo.png";
import "./CoffeeShopModal.css";

function CoffeeShopModal({ isOpen, onClose, coffeeShop }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !coffeeShop) {
    return null;
  }

  const { name, address, distance, tags, lat, lon } = coffeeShop;

  return (
    <div className="coffee-shop-modal" onClick={onClose}>
      <div
        className="coffee-shop-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="coffee-shop-modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="coffee-shop-modal__body">
          <h2 className="coffee-shop-modal__title">
            <img
              src={coffeeLogo}
              alt="Coffee shop"
              className="coffee-shop-modal__logo"
            />
            {name || "Unnamed Coffee Shop"}
          </h2>
          {address && (
            <div className="coffee-shop-modal__section">
              <h3 className="coffee-shop-modal__section-title">Address</h3>
              <p className="coffee-shop-modal__text">{address}</p>
            </div>
          )}
          {distance !== undefined && (
            <div className="coffee-shop-modal__section">
              <h3 className="coffee-shop-modal__section-title">Distance</h3>
              <p className="coffee-shop-modal__text">
                {distance.toFixed(1)} miles away
              </p>
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className="coffee-shop-modal__section">
              <h3 className="coffee-shop-modal__section-title">Features</h3>
              <div className="coffee-shop-modal__tags">
                {tags.map((tag, index) => (
                  <span key={index} className="coffee-shop-modal__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {lat && lon && (
            <div className="coffee-shop-modal__section">
              <h3 className="coffee-shop-modal__section-title">Location</h3>
              <p className="coffee-shop-modal__text">
                Coordinates: {lat.toFixed(6)}, {lon.toFixed(6)}
              </p>
              <a
                href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=15`}
                target="_blank"
                rel="noopener noreferrer"
                className="coffee-shop-modal__link"
              >
                View on OpenStreetMap →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoffeeShopModal;

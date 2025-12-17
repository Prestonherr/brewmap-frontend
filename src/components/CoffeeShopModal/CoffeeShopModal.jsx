import { useEffect, useState } from "react";
import coffeeLogo from "../../images/coffee-logo.png";
import { saveCoffeeShop, deleteCoffeeShop } from "../../utils/backend-api";
import "./CoffeeShopModal.css";

function CoffeeShopModal({
  isOpen,
  onClose,
  coffeeShop,
  isSaved,
  onSave,
  onDelete,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [savedStatus, setSavedStatus] = useState(isSaved);

  useEffect(() => {
    setSavedStatus(isSaved);
  }, [isSaved]);

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

  const { name, address, distance, tags, lat, lon, id, osmId, originalTags } =
    coffeeShop;

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const handleSave = () => {
    if (!isLoggedIn()) {
      alert("Please log in to save coffee shops");
      return;
    }

    setIsSaving(true);
    // Use originalTags if available (object), otherwise use empty object
    // tags is an array for display, but backend needs an object
    const tagsObject = originalTags || {};

    const coffeeShopData = {
      name: name || "Unnamed Coffee Shop",
      address: address || "",
      lat,
      lon,
      distance,
      tags: tagsObject,
      osmId: osmId || id?.toString() || "",
    };

    saveCoffeeShop(coffeeShopData)
      .then(() => {
        setSavedStatus(true);
        if (onSave) onSave();
      })
      .catch((error) => {
        console.error("Error saving coffee shop:", error);
        const errorMessage =
          error.message ||
          "Failed to save coffee shop. Please make sure the backend server is running.";
        alert(errorMessage);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleDelete = () => {
    if (!coffeeShop._id) {
      alert("This coffee shop is not saved");
      return;
    }

    if (
      !window.confirm("Are you sure you want to delete this saved coffee shop?")
    ) {
      return;
    }

    setIsDeleting(true);
    deleteCoffeeShop(coffeeShop._id)
      .then(() => {
        setSavedStatus(false);
        if (onDelete) onDelete();
      })
      .catch((error) => {
        console.error("Error deleting coffee shop:", error);
        const errorMessage =
          error.message ||
          "Failed to delete coffee shop. Please make sure the backend server is running.";
        alert(errorMessage);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

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
          {(() => {
            // Handle tags as either array (from search) or object (from saved)
            const displayTags = Array.isArray(tags)
              ? tags
              : tags && typeof tags === "object"
                ? Object.values(tags).filter(Boolean)
                : [];
            return displayTags.length > 0 ? (
              <div className="coffee-shop-modal__section">
                <h3 className="coffee-shop-modal__section-title">Features</h3>
                <div className="coffee-shop-modal__tags">
                  {displayTags.map((tag, index) => (
                    <span key={index} className="coffee-shop-modal__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null;
          })()}
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
        {isLoggedIn() && (
          <div className="coffee-shop-modal__actions">
            {savedStatus || coffeeShop._id ? (
              <button
                className="coffee-shop-modal__delete-button"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            ) : (
              <button
                className="coffee-shop-modal__save-button"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CoffeeShopModal;

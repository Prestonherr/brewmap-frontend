import coffeeLogo from "../../images/coffee-logo.png";
import "./CoffeeShopCard.css";

function CoffeeShopCard({ coffeeShop, onClick }) {
  const { name, address, distance, tags } = coffeeShop;

  return (
    <article
      className="coffee-shop-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${name || "coffee shop"}`}
    >
      <div className="coffee-shop-card__content">
        <h3 className="coffee-shop-card__name">
          <img
            src={coffeeLogo}
            alt="Coffee shop"
            className="coffee-shop-card__logo"
          />
          {name || "Unnamed Coffee Shop"}
        </h3>
        {address && <p className="coffee-shop-card__address">{address}</p>}
        {distance !== undefined && (
          <p className="coffee-shop-card__distance">
            {distance.toFixed(1)} miles away
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="coffee-shop-card__tags">
            {tags.map((tag, index) => (
              <span key={index} className="coffee-shop-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default CoffeeShopCard;

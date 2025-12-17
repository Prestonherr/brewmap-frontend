import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  getCurrentUser,
  updateUserProfile,
} from "../../utils/auth-api";
import { getSavedCoffeeShops, deleteCoffeeShop } from "../../utils/backend-api";
import CoffeeShopCard from "../CoffeeShopCard/CoffeeShopCard";
import CoffeeShopModal from "../CoffeeShopModal/CoffeeShopModal";
import Preloader from "../Preloader/Preloader";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [savedCoffeeShops, setSavedCoffeeShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);
    setEditName(currentUser?.name || "");

    getSavedCoffeeShops()
      .then((shops) => {
        setSavedCoffeeShops(shops || []);
      })
      .catch((err) => {
        console.error("Error loading saved coffee shops:", err);
        setError(err.message || "Failed to load saved coffee shops");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    // Refresh user data when component mounts or when user changes
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setEditName(currentUser.name || "");
    }
  }, []);

  const handleDelete = (coffeeShopId) => {
    deleteCoffeeShop(coffeeShopId)
      .then(() => {
        setSavedCoffeeShops((prev) =>
          prev.filter((shop) => shop._id !== coffeeShopId)
        );
      })
      .catch((err) => {
        console.error("Error deleting coffee shop:", err);
        alert(err.message || "Failed to delete coffee shop");
      });
  };

  const handleSave = () => {
    // Refresh the list after saving
    getSavedCoffeeShops()
      .then((shops) => {
        setSavedCoffeeShops(shops || []);
      })
      .catch((err) => {
        console.error("Error loading saved coffee shops:", err);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditName(user?.name || "");
    setEditError("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(user?.name || "");
    setEditError("");
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    setEditError("");
    setIsSaving(true);

    if (!editName.trim() || editName.trim().length < 2) {
      setEditError("Name must be at least 2 characters long");
      setIsSaving(false);
      return;
    }

    updateUserProfile(editName.trim())
      .then((data) => {
        setUser(data.user);
        setIsEditing(false);
        // Trigger a page reload to update header
        window.location.reload();
      })
      .catch((err) => {
        setEditError(err.message || "Failed to update name");
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (!user) {
    return null;
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Profile</h1>

        <section className="profile__user-info">
          <div className="profile__section-header">
            <h2 className="profile__section-title">User Information</h2>
            {!isEditing && (
              <button
                className="profile__edit-button"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}
          </div>
          {isEditing ? (
            <form className="profile__edit-form" onSubmit={handleSaveName}>
              <div className="profile__info-item">
                <label htmlFor="name" className="profile__info-label">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  className="profile__edit-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={30}
                  disabled={isSaving}
                />
              </div>
              <div className="profile__info-item">
                <span className="profile__info-label">Email:</span>
                <span className="profile__info-value">{user.email}</span>
              </div>
              {editError && (
                <div className="profile__edit-error">{editError}</div>
              )}
              <div className="profile__edit-actions">
                <button
                  type="button"
                  className="profile__cancel-button"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile__save-button"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="profile__info-item">
                <span className="profile__info-label">Name:</span>
                <span className="profile__info-value">{user.name}</span>
              </div>
              <div className="profile__info-item">
                <span className="profile__info-label">Email:</span>
                <span className="profile__info-value">{user.email}</span>
              </div>
            </>
          )}
        </section>

        <section className="profile__saved-shops">
          <h2 className="profile__section-title">
            Saved Coffee Shops ({savedCoffeeShops.length})
          </h2>

          {isLoading ? (
            <Preloader />
          ) : error ? (
            <p className="profile__error">{error}</p>
          ) : savedCoffeeShops.length === 0 ? (
            <p className="profile__empty-message">
              You haven't saved any coffee shops yet. Start exploring and save
              your favorites!
            </p>
          ) : (
            <div className="profile__coffee-shops-grid">
              {savedCoffeeShops.map((shop) => (
                <CoffeeShopCard
                  key={shop._id}
                  coffeeShop={shop}
                  onClick={() => {
                    setSelectedCoffeeShop(shop);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <CoffeeShopModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCoffeeShop(null);
        }}
        coffeeShop={selectedCoffeeShop}
        isSaved={true}
        onSave={handleSave}
        onDelete={() => {
          if (selectedCoffeeShop?._id) {
            handleDelete(selectedCoffeeShop._id);
            setIsModalOpen(false);
            setSelectedCoffeeShop(null);
          }
        }}
      />
    </main>
  );
}

export default Profile;

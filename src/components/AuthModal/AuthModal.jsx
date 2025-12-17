import { useState } from "react";
import { register, login } from "../../utils/auth-api";
import "./AuthModal.css";

function AuthModal({ isOpen, onClose, mode = "login", onAuthSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (mode === "register") {
      register(formData.email, formData.name, formData.password)
        .then(() => {
          onAuthSuccess?.();
          onClose();
          setFormData({ email: "", name: "", password: "" });
        })
        .catch((err) => {
          setError(err.message || "Registration failed");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      login(formData.email, formData.password)
        .then(() => {
          onAuthSuccess?.();
          onClose();
          setFormData({ email: "", name: "", password: "" });
        })
        .catch((err) => {
          setError(err.message || "Login failed");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="auth-modal" onClick={onClose}>
      <div
        className="auth-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="auth-modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="auth-modal__title">
          {mode === "register" ? "Register" : "Login"}
        </h2>
        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="auth-modal__field">
              <label htmlFor="name" className="auth-modal__label">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="auth-modal__input"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={30}
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="auth-modal__field">
            <label htmlFor="email" className="auth-modal__label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="auth-modal__input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="auth-modal__field">
            <label htmlFor="password" className="auth-modal__label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="auth-modal__input"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="auth-modal__error">{error}</div>}
          <button
            type="submit"
            className="auth-modal__submit-button"
            disabled={isLoading}
          >
            {isLoading
              ? mode === "register"
                ? "Registering..."
                : "Logging in..."
              : mode === "register"
                ? "Register"
                : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;


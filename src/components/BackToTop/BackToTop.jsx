import { useNavigate } from "react-router-dom";
import "./BackToTop.css";

function BackToTop() {
  const navigate = useNavigate();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/");
  };

  return (
    <button
      className="back-to-top"
      onClick={handleBackToTop}
      aria-label="Back to top and home"
    >
      ↑ Back to Top
    </button>
  );
}

export default BackToTop;

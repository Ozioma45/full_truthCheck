import { useNavigate } from "react-router-dom";
//import { Footer } from "../components/Footer";
import FormInput from "../components/FormInput";
import Header from "../components/Header";
import "./Quickcheck.css";

const QuickCheck = () => {
  const navigate = useNavigate();

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    try {
      const res = await fetch(`http://localhost:3000/api/fact-check?query=${encodeURIComponent(text)}`);
      const data = await res.json();

      // Save to localStorage
      localStorage.setItem("factCheckResult", JSON.stringify(data));

      // Navigate to result page
      navigate("/quick-check/result");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while checking the fact.");
    }
  };

  return (
    <>
      <Header headertitle="Quick Check" />
      <div className="quick-check-container">
        <h2>Check the fact - fast</h2>
        <p className="quick-check-p">
          Paste a link, type a claim, or upload an image to verify if it's true or false
        </p>
        <FormInput onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default QuickCheck;

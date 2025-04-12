import React, { useEffect, useState } from "react";
import "./Quickcheckresult.css";
import Header from "../components/Header";
import Arrow from "../assets/img/Arrow 1.svg";
import { Link } from "react-router-dom";

const Quickcheckresult: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const result = localStorage.getItem("factCheckResult");
    if (result) {
      setData(JSON.parse(result));
    }
  }, []);

  if (!data || !data.claims || data.claims.length === 0) {
    return (
      <>
        <Header headertitle="Quick Check" />
        <Link to={"/quick-check"} className="backLink">
          <img src={Arrow} alt="backarrow" />
          Back to previous page
        </Link>
        <div className="fact-check-container">
          <p>No fact-check result found.</p>
        </div>
      </>
    );
  }

  const claim = data.claims[0]; // use first result for now

  return (
    <>
  <Header headertitle="Quick Check" />
  <Link to={"/quick-check"} className="backLink">
    <img src={Arrow} alt="backarrow" />
    Back to previous page
  </Link>

  <div className="fact-check-container">
    {data.claims.map((claim: any, index: number) => (
      <div className="fact-check-content" key={index}>
        <div className="search-category">
          <span className="search-text">
            SEARCH CATEGORY - {claim.claimReview?.[0]?.languageCode?.toUpperCase() || "UNKNOWN"}
          </span>
        </div>

        <h1 className="headline">{claim.text || "No headline found"}</h1>

        <div className="metadata">
          <span className="date">
            {new Date(claim.claimReview?.[0]?.reviewDate).toDateString()}
          </span>
          <span className="status">
            Status -{" "}
            <span
              className={
                claim.claimReview?.[0]?.textualRating === "False"
                  ? "false-tag"
                  : "true-tag"
              }
            >
              {claim.claimReview?.[0]?.textualRating?.toUpperCase() || "UNKNOWN"}
            </span>
          </span>
        </div>

        <div className="sources">
          <span className="sources-text">
            Source:{" "}
            <a
              href={claim.claimReview?.[0]?.url}
              className="source-link"
              target="_blank"
              rel="noreferrer"
            >
              {claim.claimReview?.[0]?.publisher?.name || "Source"}
            </a>
          </span>
        </div>

        <div className="fact-check-details">
          <div className="claim-section">
            <h2 className="section-title">CLAIM</h2>
            <p className="claim-text">{claim.text}</p>
          </div>

          <div className="summary-section">
            <h2 className="section-title">SUMMARY</h2>
            <p className="summary-text">
              {claim.claimReview?.[0]?.title || "No summary available"}
            </p>
          </div>
        </div>

        {/* Optional: Add divider between entries */}
        <hr className="claim-divider" />
      </div>
    ))}
  </div>
</>

  );
};

export default Quickcheckresult;

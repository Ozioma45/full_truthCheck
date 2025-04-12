// components/LandingPage.tsx
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">
          <i className="logo-icon">✓</i>
          <span>TruthCheck</span>
        </div>
        <nav className="landing-nav">
          <Link to="/login" className="login-btn">
            Log In
          </Link>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="landing-main">
        <div className="hero-section">
          <h1>Verify Information. Combat Misinformation.</h1>
          <p>
            TruthCheck helps you identify and report misleading claims to keep
            your community informed with accurate information.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Get Started
            </Link>
            <a href="#how-it-works" className="secondary-btn">
              Learn More
            </a>
          </div>
        </div>

        <section id="how-it-works" className="features-section">
          <h2>How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Quick Check</h3>
              <p>
                Verify information instantly against our database of
                fact-checked claims.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚩</div>
              <h3>Report Claims</h3>
              <p>
                Flag misleading content and help build a more truthful online
                environment.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Impact</h3>
              <p>
                See how your contributions are helping combat misinformation.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 TruthCheck. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

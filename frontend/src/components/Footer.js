import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <Link to="/">
          <span className="logo-part CarboNex">CarboNex</span>
          <span className="logo-part Farm">Farm</span>
        </Link>
      </div>
      <div className="footer-text">
        <p>
          AI and ML-Based Carbon Credit Trading Platform leverages
          blockchain for transparent and secure carbon credit transactions while
          utilizing AI to predict carbon sequestration from agricultural
          practices. This innovative approach empowers businesses and farmers to
          trade credits with real-time insights, promoting sustainability
          through technology in the agriculture sector.
        </p>
      </div>

      <div className="footer-copyright">
        <p>&copy; 2024 CarboNexFarm. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

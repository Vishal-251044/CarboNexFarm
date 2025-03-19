import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  FaLock,
  FaBrain,
  FaLaptopCode,
  FaFileContract,
  FaCloud,
  FaEye,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import home1img from "../assets/20.webp";
import process from "../assets/9.webp";
import reforestationImg from "../assets/21.jpg";
import renewableEnergyImg from "../assets/14.jpg";
import agriculturalPracticesImg from "../assets/12.jpg";
import wasteManagementImg from "../assets/18.jpg";
import landfillManagementImg from "../assets/17.jpg";
import otherOffsetImg from "../assets/8.webp";
import "../screens_styles/Home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CCT from "../components/CCT";

const Home = () => {
  const [offsetIndex, setOffsetIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const offsets = [
    {
      img: reforestationImg,
      title: "Reforestation",
      description:
        "Planting trees in deforested areas helps restore ecosystems, sequesters carbon dioxide from the atmosphere, and promotes biodiversity for a healthier environment.",
    },
    {
      img: renewableEnergyImg,
      title: "Renewable Energy",
      description:
        "Generating energy from renewable sources like wind, solar, and hydro reduces reliance on fossil fuels, decreases greenhouse gas emissions, and promotes sustainable practices.",
    },
    {
      img: agriculturalPracticesImg,
      title: "Carbon-Storing Agricultural Practices",
      description:
        "Implementing practices such as cover cropping and reduced tillage enhances soil carbon storage, improves soil health, and increases agricultural productivity sustainably.",
    },
    {
      img: wasteManagementImg,
      title: "Waste Management",
      description:
        "Proper waste management practices, including recycling and composting, reduce landfill methane emissions and prevent environmental contamination, promoting a cleaner, healthier planet.",
    },
    {
      img: landfillManagementImg,
      title: "Landfill Management",
      description:
        "Effective landfill management involves capturing methane emissions and controlling waste decomposition, reducing greenhouse gases, and minimizing environmental impact from landfills.",
    },
    {
      img: otherOffsetImg,
      title: "Other Offsets",
      description:
        "Various other methods include carbon capture technologies and sustainable land use practices, all contributing to reducing greenhouse gas emissions and enhancing environmental sustainability.",
    },
  ];

  const handlePrev = () => {
    setOffsetIndex((prevIndex) =>
      prevIndex === 0 ? offsets.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setOffsetIndex((prevIndex) =>
      prevIndex === offsets.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://carbonexfarm-backend.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, { autoClose: 3000 });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to send message: ${errorData.error || "Unknown error"}`, { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error occurred while sending message:", error);
      toast.error("Error occurred while sending message!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="home1container">
        <div className="home1text">
          <h1>Empower Your Future with Sustainability</h1>
          <p>
            Unlock the potential of carbon credits to boost your income and
            protect the planet with smart agricultural practices.
          </p>
          <div className="cct">
            Current CCT Price ₹<b><CCT /></b>
          </div>
        </div>
        <div className="home1image">
          <img src={home1img} alt="Sustainability" />
        </div>
      </div>
      <div className="features-section">
        <h1>Why Choose CarboNexFarm for Carbon Credit Trading?</h1>
        <div className="features-grid">
          <div className="feature">
            <FaLock className="feature-icon" />
            <h2>Blockchain Transparency</h2>
            <p>
              Ensures a transparent, tamper-proof environment for secure
              transactions. Prevents fraud or double-spending, building trust
              between farmers and businesses.
            </p>
          </div>
          <div className="feature">
            <FaBrain className="feature-icon" />
            <h2>AI-Driven Predictions</h2>
            <p>
              Uses machine learning models to forecast carbon sequestration
              potential based on farming methods.
            </p>
          </div>
          <div className="feature">
            <FaLaptopCode className="feature-icon" />
            <h2>User-Friendly Interface</h2>
            <p>
              Built using MERN stack, making carbon credit trading easy for both
              farmers and businesses.
            </p>
          </div>
          <div className="feature">
            <FaFileContract className="feature-icon" />
            <h2>Smart Contracts</h2>
            <p>
              Automates transactions with blockchain-based smart contracts,
              reducing intermediaries.
            </p>
          </div>
          <div className="feature">
            <FaCloud className="feature-icon" />
            <h2>Cloud Scalability</h2>
            <p>
              Uses cloud platforms for real-time data storage and scaling as the
              platform grows.
            </p>
          </div>
          <div className="feature">
            <FaEye className="feature-icon" />
            <h2>Impact Visualization</h2>
            <p>
              Provides dashboards showing environmental impact and financial
              gains from sustainable farming.
            </p>
          </div>
        </div>
      </div>

      <div className="offsets">
        <h1 className="offsets-header">Carbon Offset Examples</h1>
        <div className="offsets-container">
          <FaArrowLeft className="arrow" onClick={handlePrev} />
          <div
            className="offsets-slider"
            style={{ transform: `translateX(-${offsetIndex * 100}%)` }}
          >
            {offsets.map((offset, index) => (
              <div key={index} className="offset">
                <img src={offset.img} alt={offset.title} />
                <h2>{offset.title}</h2>
                <p>{offset.description}</p>
              </div>
            ))}
          </div>
          <FaArrowRight className="arrow" onClick={handleNext} />
        </div>
      </div>

      <div className="process">
        <div>
          <img src={process} alt="Carbon Trading Process" />
        </div>
        <div>
          <h1>How to use?</h1>
          <p>
            In this carbon credit trading platform, users first log in with
            their credentials and add all relevant farm data on the profile
            page. The platform's AI model analyzes this data and converts it
            into carbon credit points. These points can then be listed for sale
            in the marketplace. When a company expresses interest in purchasing
            the carbon credits, blockchain technology ensures a secure
            transaction. Upon completion, both the farmer’s and the company's
            profiles are automatically updated to reflect the transaction, with
            points transferred securely. The platform ensures transparency and
            trust while enabling seamless trading between farmers and companies.
          </p>
        </div>
      </div>

      <div className="contact-us">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

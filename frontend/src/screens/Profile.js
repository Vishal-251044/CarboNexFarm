import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../screens_styles/Profile.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  // User and farmer state
  const [user, setUser] = useState(null);
  const [loadingCalculate, setLoadingCalculate] = useState(false);
  const [loadingSell, setLoadingSell] = useState(false);
  const [isFarmer, setIsFarmer] = useState(false);

  // Form input state for calculating carbon points
  const [cropName, setCropName] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [nValue, setNValue] = useState("");
  const [pValue, setPValue] = useState("");
  const [kValue, setKValue] = useState("");
  const [cropLifespan, setCropLifespan] = useState("");

  // Selling carbon credit state
  const [carbonCreditPoints, setCarbonCreditPoints] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please login first",
      });
      navigate("/SignIn");
    } else {
      // Fetch farmer or company data based on user email
      fetch(`https://carbonexfarm-backend.onrender.com/api/farmer/${loggedUser.email}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error fetching farmer data");
          }
        })
        .then((data) => {
          setUser(data);
          setIsFarmer(true); // User is a farmer
        })
        .catch(() => {
          fetch(`https://carbonexfarm-backend.onrender.com/api/company/${loggedUser.email}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Error fetching company data");
            })
            .then((data) => {
              setUser(data);
              setIsFarmer(false); // User is a company
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message,
              });
            });
        });
    }
  }, [navigate]);

  // Logout functionality
  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Logout successful",
    });
    navigate("/SignIn");
  };

  // Function to calculate carbon points and update the farmer dataset
  const handleGetCarbonCredit = async (e) => {
    e.preventDefault();
    setLoadingCalculate(true);

    const requestData = {
      cropName,
      farmSize: parseFloat(farmSize),
      nValue: parseFloat(nValue),
      pValue: parseFloat(pValue),
      kValue: parseFloat(kValue),
      cropLifespan: parseInt(cropLifespan),
    };

    try {
      const response = await fetch(
        "https://carbon-point-model.onrender.com/api/predict-carbon-points",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch carbon points");
      }

      const data = await response.json();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Your carbon points: ${data.carbonPoints}`,
      });

      // Update carbon points in the database
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      const updateResponse = await fetch(
        "https://carbonexfarm-backend.onrender.com/api/farmer/update-carbon-points",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loggedUser.email,
            carbonPoints: data.carbonPoints,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update carbon points");
      }

      setCropName("");
      setFarmSize("");
      setNValue("");
      setPValue("");
      setKValue("");
      setCropLifespan("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoadingCalculate(false); // Stop loading
    }
  };

  // Function to handle selling carbon credits
  const handleSellCarbonCredit = async (e) => {
    e.preventDefault();
    setLoadingSell(true);

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await fetch("https://carbonexfarm-backend.onrender.com/api/sell-carbon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loggedUser.email,
          carbonCreditPoints,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
        setUser((prevUser) => ({
          ...prevUser,
          carbonPoint: prevUser.carbonPoint - carbonCreditPoints,
        }));
        setCarbonCreditPoints("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoadingSell(false); // Stop loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-content">
        <h1 className="profile-header">Your Profile</h1>
        {user ? (
          <>
            <p id="profile-name">
              <b>Name:</b> {user.name}
            </p>
            <p id="profile-email">
              <b>Email:</b> {user.email}
            </p>

            {isFarmer && (
              <>
                <p id="farmer-carbon-points">
                  <b>Carbon Points:</b> {user.carbonPoint}
                </p>

                {/* Form to calculate carbon credits */}
                <h2 className="section-header">Get Carbon Credit</h2>
                <form onSubmit={handleGetCarbonCredit} className="carbon-form">
                  <select
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="" disabled>
                      Select Crop
                    </option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Wheat">Wheat</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Farm Size (in acres)"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    required
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="N Value"
                    value={nValue}
                    onChange={(e) => setNValue(e.target.value)}
                    required
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="P Value"
                    value={pValue}
                    onChange={(e) => setPValue(e.target.value)}
                    required
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="K Value"
                    value={kValue}
                    onChange={(e) => setKValue(e.target.value)}
                    required
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Crop Lifespan (in months)"
                    value={cropLifespan}
                    onChange={(e) => setCropLifespan(e.target.value)}
                    required
                    className="form-input"
                  />
                  <button type="submit" className="submit-btn" disabled={loadingCalculate}>
                    {loadingCalculate ? "Processing..." : "Calculate Carbon Point"}
                  </button>
                </form>

                {/* Form to sell carbon credits */}
                <h2 className="section-header">Sell Carbon Credit</h2>
                <form onSubmit={handleSellCarbonCredit} className="sell-form">
                  <input
                    type="number"
                    placeholder="Carbon Credit Points"
                    value={carbonCreditPoints}
                    onChange={(e) => setCarbonCreditPoints(e.target.value)}
                    required
                    className="form-input"
                  />
                  <button type="submit" className="submit-btn" disabled={loadingSell}>
                    {loadingSell ? "Processing..." : "Sell Carbon Credit"}
                  </button>
                </form>
              </>
            )}

            {!isFarmer && (
              <>
                <p id="company-carbon-points">
                  <b>Carbon Points:</b> {user.carbonPoint}
                </p>
              </>
            )}

            <div className="parent-container">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </>
        ) : (
          <p className="loading-message">Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;

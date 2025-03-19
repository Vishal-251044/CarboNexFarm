import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import "../screens_styles/Market.css";

const Market = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [cctPrice, setCctPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("https://carbonexfarm-backend.onrender.com/api/market-data");
        const data = await response.json();
        setAllCards(data);
        setFilteredCards(data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketData();
  }, []);

  useEffect(() => {
    const fetchCCTPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=carbon-credit&vs_currencies=inr"
        );
        const data = await response.json();
        if (data["carbon-credit"] && data["carbon-credit"].inr) {
          setCctPrice(data["carbon-credit"].inr);
        }
      } catch (error) {
        console.error("Error fetching CCT price:", error);
      }
    };
    fetchCCTPrice();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === "") {
      setFilteredCards(allCards);
    } else {
      const numberValue = parseInt(value, 10);
      if (!isNaN(numberValue)) {
        const filtered = allCards.filter(
          (card) => card.carbonPoints <= numberValue
        );
        setFilteredCards(filtered);
      } else {
        setFilteredCards([]);
      }
    }
  };

  const initiatePayment = async (amount, marketId) => {
    const options = {
      key: "rzp_test_oB6Z965by3wM4n",
      amount: amount * 100,
      currency: "INR",
      name: "Carbon Credit Market",
      description: "Purchase Carbon Points",
      handler: async (response) => {
        try {
          const loggedUser = JSON.parse(localStorage.getItem("user"));

          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            userEmail: loggedUser.email,
            marketId: marketId,
          };

          const apiResponse = await fetch("https://carbonexfarm-backend.onrender.com/api/buy-carbon", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          if (!apiResponse.ok) {
            throw new Error("Failed to process transaction.");
          }

          const result = await apiResponse.json();

          Swal.fire({
            icon: "success",
            title: "Purchase Successful",
            text: result.message,
            confirmButtonText: "OK",
          });

          setAllCards(allCards.filter((card) => card._id !== marketId));
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Transaction Failed",
            text: error.message,
            confirmButtonText: "Try Again",
          });
        }
      },
      prefill: {
        name: "Vishal Subhash Chavan",
        email: "vsc251044@gmail.com",
        contact: "8010045390",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBuy = (marketId, carbonPoints) => {
    if (cctPrice) {
      const totalPrice = (carbonPoints * cctPrice).toFixed(2);
      Swal.fire({
        title: "Confirm Purchase",
        text: `You are about to purchase ${carbonPoints} carbon points for ₹${totalPrice}. Proceed? (Current CCT price is ₹${cctPrice})`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Buy",
      }).then((result) => {
        if (result.isConfirmed) {
          initiatePayment(totalPrice, marketId);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to fetch CCT price. Try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="market-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter carbon points...(eg. 100)"
            className="search-input"
            value={searchValue}
            onChange={handleSearch}
          />
          <button className="search-button">
            <FaSearch className="search-icon" />
          </button>
        </div>
      </div>

      <div className="carbonpoints">
        {loading ? ( 
          <p className="loading-message">Loading...</p>
        ) : filteredCards.length > 0 ? ( 
          filteredCards.map((card, index) => (
            <div key={index} className="card">
              <div className="card-details">
                <h3>{card.farmerName}</h3>
                <p>
                  <b>Carbon Points:</b> {card.carbonPoints}
                </p>
                <p>
                  <b>Date:</b> {new Date(card.transactionDate).toLocaleDateString()}
                </p>
                <button
                  className="buy-button"
                  onClick={() => handleBuy(card._id, card.carbonPoints)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results-message">No results found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Market;

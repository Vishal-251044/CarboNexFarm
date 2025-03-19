import React, { useState, useEffect } from "react";

const CCT = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchCCTPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=carbon-credit&vs_currencies=inr"
        );
        const data = await response.json();

        if (data["carbon-credit"] && data["carbon-credit"].inr) {
          setPrice(data["carbon-credit"].inr);
        } else {
          setPrice("100.00"); 
        }
      } catch (error) {
        console.error("Error fetching CCT price:", error);
        setPrice("Error");
      }
    };

    fetchCCTPrice();
  }, []);

  return (
    <div>
      {price !== null ? (
        <span className="cct-price">{price}</span> 
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default CCT;

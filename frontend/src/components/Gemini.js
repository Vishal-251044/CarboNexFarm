import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Gemini = ({ question }) => {
  const [answer, setAnswer] = useState("Loading...");

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const genAI = new GoogleGenerativeAI("-------Your Gemini API Key-------");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `${question}. Answer in one or two sentences: Farmers and companies log in with basic details. Farmers generate carbon points from farm data (size, NPK values, lifespan), sold to companies securely at market rates.`;

        const result = await model.generateContent(prompt);

        const fullAnswer = result.response.text().trim();
        const trimmedAnswer = fullAnswer.split(". ").slice(0, 2).join(". ") + ".";

        setAnswer(trimmedAnswer);
      } catch (error) {
        console.error("Error fetching answer:", error);

        setAnswer(
          "Farmers generate carbon points from farm data and sell to companies at market rates securely on CarboNexFarm."
        );
      }
    };

    if (question) {
      fetchAnswer();
    }
  }, [question]);

  return (
    <div className="gemini-answer">
      <p>{answer}</p>
    </div>
  );
};

export default Gemini;

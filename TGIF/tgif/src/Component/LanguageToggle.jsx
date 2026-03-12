import React, { useState } from "react";

const LanguageToggle = ({ language: controlledLanguage, setLanguage }) => {
  const [internalLanguage, setInternalLanguage] = useState("EN");

  const language = controlledLanguage ?? internalLanguage;

  const handleChange = (next) => {
    if (setLanguage) {
      setLanguage(next);
    } else {
      setInternalLanguage(next);
    }
  };

  return (
    <div className="lang-toggle">
      <button
        className={language === "EN" ? "active" : ""}
        onClick={() => handleChange("EN")}
      >
        EN
      </button>

      <button
        className={language === "FR" ? "active" : ""}
        onClick={() => handleChange("FR")}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;

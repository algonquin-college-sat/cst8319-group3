import React from "react";

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="lang-toggle">
      <button
        className={language === "EN" ? "active" : ""}
        onClick={() => setLanguage("EN")}
      >
        EN
      </button>

      <button
        className={language === "FR" ? "active" : ""}
        onClick={() => setLanguage("FR")}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;

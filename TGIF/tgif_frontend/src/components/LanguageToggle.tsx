import React from "react";

interface LanguageToggleProps {
  language: "en" | "fr"; // use lowercase for consistency
  setLanguage: (lang: "en" | "fr") => void;
}

const LanguageToggle = ({ language, setLanguage }: LanguageToggleProps) => {
  return (
    <div className="lang-toggle">
      <button
        className={language === "en" ? "active" : ""}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>

      <button
        className={language === "fr" ? "active" : ""}
        onClick={() => setLanguage("fr")}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;
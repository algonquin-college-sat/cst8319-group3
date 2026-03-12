import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (next) => setLanguage(next);

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

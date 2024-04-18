import React from 'react';
import { Langugage_version } from "../../constant/Language";

const LangugageSelector = ({setLanguage}) => {
  const languages = Object.entries(Langugage_version);

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };


  return (
    <div>
      <select onChange={handleChange}>
        {languages.map(([language, version]) => (
          <option key={language} value={language}>
            {language} - {version}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LangugageSelector;

import React, { useContext } from "react";
import CountryContext from "../context/CountryContext";

function ChooseCountry() {
  const { country, chooseCountry } = useContext(CountryContext);
  const handleChange = (event) => {
    chooseCountry(event.target.value);
  };

  return (
    <div>
      <label htmlFor="country-select">
        <strong>Select Country: </strong>
      </label>
      <select id="country-select" value={country} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="US">United States of America (US)</option>
        <option value="FR">France</option>

        <option value="JP">Japan</option>
        <option value="DE">Germany</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
}

export default ChooseCountry;

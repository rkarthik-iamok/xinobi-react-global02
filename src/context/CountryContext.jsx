import { createContext, useState } from "react";
import config from "../config";

const countryToRegion = {
  US: "US",
  FR: "EU",
  CN: "AP",
  DE: "EU",
  JP: "AP",
};

const localeToRegion = {
  "en-US": "US",
  "en-UK": "EU",
  "en-GB": "EU",
  "fr-FR": "EU",
  "es-ES": "EU",
  "zh-CN": "AP",
  "en-AU": "AP",
  "en-NZ": "AP",
  "pt-BR": "US",
  "fr-CA": "US",
};

const regionToIdpId = {
  US: null,
  EU: config.dr.eu_idp,
  AP: config.dr.ap_idp,
};

const regionalRedirectURL = {
  US: null,
  EU: "https://ciam-spoke02.karthiktc.com/app/okta_org2org/exkc28xmjiQhNIE8T697/sso/saml?RelayState",
  AP: "https://ciam-spoke01.karthiktc.com/app/okta_org2org/exkcgsgxn3ZpTPsgJ697/sso/saml?RelayState",
};

const regionalSignupLinks = {
  EU: config.dr.eu_signup,
  US: config.dr.us_signup,
  AP: config.dr.ap_signup,
};

const getCountryFromLocale = (locale) => {
  if (locale == "ja" || locale == "JA") {
    return "JP";
  }

  // Split the locale string by '-'
  const parts = locale.split("-");

  // The country code is typically the second part
  const countryCode = parts.length > 1 ? parts[1] : "";

  // Return the country name from the mapping object
  return countryCode || "US";
};

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const currentLocale = navigator.language;

  const [country, setCountry] = useState(getCountryFromLocale(currentLocale));
  const [region, setRegion] = useState(countryToRegion[country]);
  const [idp, setIdp] = useState(regionToIdpId[region]);
  const [signupLink, setSignupLink] = useState(regionalSignupLinks[region]);

  const chooseCountry = (c) => {
    // console.log(
    //   `Country: ${c}, Region: ${countryToRegion[c]}, IDP: ${
    //     regionToIdpId[countryToRegion[c]]
    //   }`
    // );
    setCountry(c);
    setRegion(countryToRegion[c]);
    setIdp(regionToIdpId[countryToRegion[c]]);
    setSignupLink(regionalSignupLinks[countryToRegion[c]]);
  };

  return (
    <CountryContext.Provider
      value={{
        country,
        region,
        idp,
        signupLink,
        chooseCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export default CountryContext;

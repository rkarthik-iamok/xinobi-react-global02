import { createContext, useState } from "react";

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
  EU: "0oac29d3a5FoAcmnY697",
  AP: "0oafx9jzzoa96ptfm697",
};

const regionalRedirectURL = {
  US: null,
  EU: "https://ciam-spoke02.karthiktc.com/app/okta_org2org/exkc28xmjiQhNIE8T697/sso/saml?RelayState",
  AP: "https://ciam-spoke01.karthiktc.com/app/okta_org2org/exkcgsgxn3ZpTPsgJ697/sso/saml?RelayState",
};

const regionalSignupLinks = {
  EU: "https://ciam-spoke02.karthiktc.com/app/bookmark/0oafxf26x71vfBnLb697/login?signup_page=true",
  US: "https://ciam-hub.karthiktc.com/oauth2/default/v1/authorize?client_id=0oafuyhwb5JyOMrzt697&code_challenge=Z6zu-ZZWHMn0XoDOgMPTfqCZZ7RT161vEeQTj5JQkFI&code_challenge_method=S256&nonce=FgKN9IduBMELstBSwQfQ3HdiSQ4IBohRU3MuUKsbdjI8tVj3q8z2ZB7s5YSrp5WT&redirect_uri=https%3A%2F%2Fglobal-app02.karthiktc.com%2Flogin%2Fcallback&response_type=code&state=UeDaV3JbdX60xplCbPB3Z2IQIHhoOtf9PqzUJKSu8hZRKBTNTKhAaaKXZD0swRHT&scope=openid%20profile%20email&signup_page=true",
  AP: "https://ciam-spoke01.karthiktc.com/app/bookmark/0oafxhvjafaxHfQre697/login?signup_page=true",
};

const getCountryFromLocale = (locale) => {
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

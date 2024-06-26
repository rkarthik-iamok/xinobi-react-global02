import React, { useEffect, useState } from "react";

const BrowserLocale = () => {
  const [locale, setLocale] = useState("");
  const [locales, setLocales] = useState([]);

  useEffect(() => {
    const userLocale = navigator.language || navigator.userLanguage;
    const userLocales = navigator.languages || [userLocale];

    setLocale(userLocale);
    setLocales(userLocales);
  }, []);

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

  return (
    <div>
      <p>
        <strong>Preferred Locale:</strong> {locale}
      </p>
      <p>
        <strong>All Locales:</strong> {locales.join(", ")}
      </p>
      <h2>Data Residency Info</h2>
      <p>
        <strong>Region based on Locale:</strong>
        {localeToRegion[locale]}
      </p>
      <p>
        <strong>IDP Id:</strong>
        {!regionToIdpId[localeToRegion[locale]] && (
          <span> No IdpId for Region</span>
        )}
        {regionToIdpId[localeToRegion[locale]]}
      </p>
      <p>
        <strong>RedirectURL:</strong>
        {!regionalRedirectURL[localeToRegion[locale]] && (
          <span> No RedirectURl for this region</span>
        )}
        {regionalRedirectURL[localeToRegion[locale]]}
      </p>
    </div>
  );
};

export default BrowserLocale;

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

module.exports = {
  localeToRegion,
  regionToIdpId,
  regionalRedirectURL,
};

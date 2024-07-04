const CLIENT_ID = process.env.CLIENT_ID || "{clientId}";
const ISSUER = process.env.ISSUER || "https://{yourOktaDomain}/oauth2/default";
const OKTA_TESTING_DISABLEHTTPSCHECK =
  process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;
const STEPUP_LEVEL = process.env.STEPUP_LEVEL || "urn:okta:loa:1fa:any";
const STEPUP_AGE = process.env.STEPUP_AGE || 30;
const HUB = process.env.HUB;
const SPOKE01 = process.env.SPOKE01;
const SPOKE02 = process.env.SPOKE02;
const EU_IDP = process.env.EU_IDPID;
const AP_IDP = process.env.AP_IDPID;
const EU_SIGNUP = process.env.EU_SIGNUP;
const AP_SIGNUP = process.env.AP_SIGNUP;
const US_SIGNUP = process.env.US_SIGNUP;

// eslint-disable-next-line
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    stepup_level: STEPUP_LEVEL,
    stepup_age: STEPUP_AGE,
    tokenManager: {
      storage: "sessionStorage",
    },
  },
  resourceServer: {
    messagesUrl: "http://localhost:8000/api/messages",
  },
  dr: {
    hub: HUB,
    spoke01: SPOKE01,
    spoke02: SPOKE02,
    eu_idp: EU_IDP,
    ap_idp: AP_IDP,
    eu_signup: EU_SIGNUP,
    ap_signup: AP_SIGNUP,
    us_signup: US_SIGNUP,
  },
};

/*
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import BrowserLocale from "../components/BrowserLocale";
import { Button, Header } from "semantic-ui-react";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

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

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const loginDR = async () => {
    const locale = navigator.language || navigator.userLanguage;
    const region = localeToRegion[locale];
    const idpId = regionToIdpId[region];

    if (!idpId) {
      await oktaAuth.signInWithRedirect();
    } else {
      await oktaAuth.signInWithRedirect({ idp: idpId });
    }
  };

  const login = async () => {
    // await oktaAuth.signInWithRedirect({
    //   acrValues: "urn:okta:loa:1fa:pwd",
    //   scopes: ["openid", "email", "profile", "offline_access"],
    // });
    await oktaAuth.signInWithRedirect();
  };
  const loginSpoke01 = async () => {
    // await oktaAuth.signInWithRedirect({
    //   acrValues: "urn:okta:loa:1fa:pwd",
    //   scopes: ["openid", "email", "profile", "offline_access"],
    // });
    await oktaAuth.signInWithRedirect({ idp: "0oacgvobshxAUaYri697" });
  };

  const loginSpoke02 = async () => {
    // await oktaAuth.signInWithRedirect({
    //   acrValues: "urn:okta:loa:1fa:pwd",
    //   scopes: ["openid", "email", "profile", "offline_access"],
    // });
    await oktaAuth.signInWithRedirect({ idp: "0oac29d3a5FoAcmnY697" });
  };

  const loginSpoke02oidc = async () => {
    // await oktaAuth.signInWithRedirect({
    //   acrValues: "urn:okta:loa:1fa:pwd",
    //   scopes: ["openid", "email", "profile", "offline_access"],
    // });
    await oktaAuth.signInWithRedirect({ idp: "0oafvgi4gam6ItIuN697" });
  };

  const customOption = async () => {
    await oktaAuth.signInWithRedirect({ extraParams: { signup_page: true } });
  };

  const signup = async () => {
    window.location.href =
      "https://ciam-spoke02.karthiktc.com/oauth2/default/v1/authorize?client_id=0oac2qpybeHSxXr7T697&code_challenge=AptwK4s28Vrla9GDeSLhE9QEDT_p41ZihtfDKgeKU2A&code_challenge_method=S256&nonce=yuxWTTyxdoAd2RuPGxsPIkrevxnrYlhKjGq3Fdr34rgepSuCHRGiOhlPARa0H78K&redirect_uri=https%3A%2F%2Flocal-app-01.karthiktc.com%2Flogin%2Fcallback&response_type=code&state=qOvqq0XLGbIVpk1IZRoCkNC8JnxxBzzE02ZAd1FvnpkwGN5uQcWqYvUyL6UolXSK&acr_values=urn%3Aokta%3Aloa%3A1fa%3Apwd&scope=openid%20email%20profile%20offline_access&signup_page=true";
  };

  const signupDR = async () => {
    const locale = navigator.language || navigator.userLanguage;
    const region = localeToRegion[locale];

    window.location.href = regionalSignupLinks[region];
    // window.location.href =
    //   "https://ciam-spoke02.karthiktc.com/oauth2/default/v1/authorize?client_id=0oac2qpybeHSxXr7T697&code_challenge=AptwK4s28Vrla9GDeSLhE9QEDT_p41ZihtfDKgeKU2A&code_challenge_method=S256&nonce=yuxWTTyxdoAd2RuPGxsPIkrevxnrYlhKjGq3Fdr34rgepSuCHRGiOhlPARa0H78K&redirect_uri=https%3A%2F%2Flocal-app-01.karthiktc.com%2Flogin%2Fcallback&response_type=code&state=qOvqq0XLGbIVpk1IZRoCkNC8JnxxBzzE02ZAd1FvnpkwGN5uQcWqYvUyL6UolXSK&acr_values=urn%3Aokta%3Aloa%3A1fa%3Apwd&scope=openid%20email%20profile%20offline_access&signup_page=true";
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Header as="h1">Single Instance Global App 02</Header>
        <p>
          <span>This is a single instance Global App on CIAM Hub.</span>
        </p>

        <table>
          <thead>
            <tr>
              <th>Tenant</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CIAM Hub</td>
              <td>
                <a href="https://ciam-hub.karthiktc.com">
                  https://ciam-hub.karthiktc.com
                </a>
              </td>
            </tr>
            <tr>
              <td>Spoke 01</td>
              <td>
                <a href="https://ciam-spoke01.karthiktc.com">
                  https://ciam-spoke01.karthiktc.com
                </a>
              </td>
            </tr>
            <tr>
              <td>Spoke 02</td>
              <td>
                <a href="https://ciam-spoke02.karthiktc.com">
                  https://ciam-spoke01.karthiktc.com
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <h1>Browser Locale</h1>
          <BrowserLocale />
        </div>

        {authState.isAuthenticated && !userInfo && (
          <div>Loading user information...</div>
        )}

        {authState.isAuthenticated && userInfo && (
          <div>
            <p>
              Welcome back,&nbsp;
              {userInfo.name}!
            </p>
            <p>
              <strong>Authentication Successful</strong> for user <br /> <br />
              <strong className="fed-login">{userInfo.email}</strong>
            </p>
            <p>
              You now have an ID token and access token in local storage. Visit
              the <a href="/profile">My Profile</a> page to take a look inside
              the ID token.
            </p>

            {/* <p>MAPP1</p>
            <a href="http://localhost:3000/login">MAPP1</a> */}
          </div>
        )}

        {!authState.isAuthenticated && (
          <div>
            <div className="signup-login">
              <Button id="login-button" primary onClick={login}>
                Login
              </Button>

              <Button id="login-button" primary onClick={loginDR}>
                Login DR (Browser Locale)
              </Button>

              <Button id="login-button" primary onClick={signupDR}>
                Signup DR (Browser Locale)
              </Button>

              {/* <Button id="login-button" primary onClick={loginSpoke01}>
                Login Spoke01
              </Button>

              <Button id="login-button" primary onClick={loginSpoke02}>
                Login Spoke02
              </Button> */}

              {/* <Button id="login-button" primary onClick={loginSpoke02oidc}>
                Login Spoke02 OIDC
              </Button> */}

              {/* <Button id="login-button" primary onClick={customOption}>
                Custom Login
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

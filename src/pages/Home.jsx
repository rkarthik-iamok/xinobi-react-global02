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
import React, { useState, useEffect, useContext } from "react";
import { Button, Header } from "semantic-ui-react";
import CountryContext from "../context/CountryContext";
import ChooseCountry from "../components/ChooseCountry";
import BrowserLocale from "../components/BrowserLocale";
import config from "../config";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);

  const { country, region, idp, signupLink } = useContext(CountryContext);
  const dr = config.dr;
  const hub = dr.hub;
  const spoke01 = dr.spoke01;
  const spoke02 = dr.spoke02;

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
      console.log(authState.idToken.claims.name);
      const userLoad = authState.idToken.claims.name;
      if (!authState.idToken.claims.name) {
        setUserName(userLoad);
      }
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const loginDR = async () => {
    if (!idp) {
      await oktaAuth.signInWithRedirect();
    } else {
      await oktaAuth.signInWithRedirect({ idp });
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
    window.location.href = signupLink;
    // window.location.href =
    //   "https://ciam-spoke02.karthiktc.com/oauth2/default/v1/authorize?client_id=0oac2qpybeHSxXr7T697&code_challenge=AptwK4s28Vrla9GDeSLhE9QEDT_p41ZihtfDKgeKU2A&code_challenge_method=S256&nonce=yuxWTTyxdoAd2RuPGxsPIkrevxnrYlhKjGq3Fdr34rgepSuCHRGiOhlPARa0H78K&redirect_uri=https%3A%2F%2Flocal-app-01.karthiktc.com%2Flogin%2Fcallback&response_type=code&state=qOvqq0XLGbIVpk1IZRoCkNC8JnxxBzzE02ZAd1FvnpkwGN5uQcWqYvUyL6UolXSK&acr_values=urn%3Aokta%3Aloa%3A1fa%3Apwd&scope=openid%20email%20profile%20offline_access&signup_page=true";
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="div-container">
        <div className="left-div">
          <Header as="h1">Data Residency Demo</Header>
          <Header as="h2">
            Scenario 2 - Single Instance Shared Application
          </Header>

          <p>
            <span>
              Alcon Application that is offered in multiple countries/regions,
              is a shared Okta Application. For example <br />
              <strong>
                <i>
                  This DEMO application is offered in four countries/regions.
                </i>
              </strong>
              <div className="list-container">
                <div className="list-item">
                  <ul>
                    <li>United States - (US Store)</li>
                    <li>France - (France Store)</li>
                    <li>Japan - (Japan Store)</li>
                    <li>Germany - (German Store)</li>
                  </ul>
                </div>
                <div className="list-item item-center">&#8594;</div>
                <div className="list-item item-center">
                  <strong> Single Shared Okta Application</strong>
                </div>
              </div>
            </span>
          </p>

          <div>
            <h2>Browser Locale</h2>
            <BrowserLocale />

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
                    <a href={hub}>{hub}</a>
                  </td>
                </tr>
                <tr>
                  <td>Spoke 01</td>
                  <td>
                    <a href={spoke01}>{spoke01}</a>
                  </td>
                </tr>
                <tr>
                  <td>Spoke 02</td>
                  <td>
                    <a href={spoke02}>{spoke02}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {authState.isAuthenticated && !userInfo && (
          <div>Loading user information...</div>
        )}

        {authState.isAuthenticated && userInfo && (
          <div>
            <p>
              Welcome back,&nbsp;
              {/* <strong>{authState.idToken.claims.name}!</strong> */}
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
          <div className="right-div">
            <div className="signup-login">
              <Button id="login-button" primary onClick={login}>
                Login - Regular
              </Button>

              <Button id="login-button" primary onClick={loginDR}>
                Login DR Aware - AXON JS
              </Button>

              <Button id="login-button" primary onClick={signupDR}>
                Signup DR Aware - AXON JS
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
            <div>
              <h2>Country</h2>
              <ChooseCountry />
              {/* <p>
            <strong>Country from Context API:</strong> {country}
          </p> */}
              <h2>Data Residency Info</h2>
              <table>
                <tbody>
                  <tr>
                    <th>Country</th>
                    <td>{country}</td>
                  </tr>
                  <tr>
                    <th>Region</th>
                    <td>{region}</td>
                  </tr>
                  <tr>
                    <th>IDP ID</th>
                    <td>{idp}</td>
                  </tr>
                  <tr>
                    <th>Signup Link</th>
                    <td className="table-cell">{signupLink}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

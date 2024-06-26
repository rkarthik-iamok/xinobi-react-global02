/*this a
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

import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Header, Icon, Table } from "semantic-ui-react";

const Profile2 = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
      setIdToken(null);
      setAccessToken(null);
    } else {
      setUserInfo(authState.idToken.claims);
      setIdToken(authState.idToken.idToken);
      setAccessToken(authState.accessToken.accessToken);
      // get user information from `/userinfo` endpoint
      /*oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });*/
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user Profile2...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="drivers license" /> My User Profile2 (ID Token Claims){" "}
        </Header>
        <p>
          Below is the information from your ID token which was obtained during
          authentication and is now stored in local storage.
        </p>
        <p>
          This route is protected, which will ensure that this page cannot be
          accessed until you have authenticated.
        </p>
        <Table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userInfo).map((claimEntry) => {
              const claimName = claimEntry[0];
              const claimValue = claimEntry[1];
              const claimId = `claim-${claimName}`;
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{claimValue.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <br />
          <div>
            <a target="_blank" href={"https://jwt.io?token=" + idToken}>
              ID Token
            </a>
          </div>
          {idToken}
        </div>
        <div>
          <br />
          <div>
            <a target="_blank" href={"https://jwt.io?token=" + accessToken}>
              Access Token
            </a>
          </div>
          {accessToken}
        </div>
      </div>
    </div>
  );
};

export default Profile2;

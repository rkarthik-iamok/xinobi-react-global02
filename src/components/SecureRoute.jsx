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

import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { toRelativeUrl } from "@okta/okta-auth-js";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import config from "../config";

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

export const RequiredAuth = () => {
  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return <Loading />;
  }

  return <Outlet />;
};

export const RequiredAuthDR = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const locale = navigator.language || navigator.userLanguage;
  const region = localeToRegion[locale];
  const idpId = regionToIdpId[region];

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      if (!idpId) {
        oktaAuth.signInWithRedirect();
      } else {
        oktaAuth.signInWithRedirect({ idp: idpId });
      }
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return <Loading />;
  }

  return <Outlet />;
};

export const RequiredAuthWithSpoke02 = () => {
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect({ idp: "0oafvgi4gam6ItIuN697" });
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return <Loading />;
  }

  return <Outlet />;
};

export const StepupAuth = () => {
  const { oktaAuth, authState } = useOktaAuth();

  var noStepUp = window.sessionStorage.getItem("noStepUp") == "true";

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!noStepUp) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      console.log("Stepping up");
      window.sessionStorage.setItem("noStepUp", "true");
      // oktaAuth.signInWithRedirect({
      //   acrValues: config.oidc.stepup_level,
      //   maxAge: config.oidc.stepup_age,
      // });
      oktaAuth.signInWithRedirect({
        acrValues: "urn:okta:loa:2fa:any",
        scopes: ["openid", "email", "profile"],
        extraParams: {
          targetUri: originalUri,
        },
      });
    } else {
      console.log("Not Stepping up");
      window.sessionStorage.setItem("noStepUp", "false");
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (noStepUp) return <Outlet />;
};

export const StepupAuthAlways = () => {
  const { oktaAuth, authState } = useOktaAuth();

  var noStepUp = window.sessionStorage.getItem("noStepUp") == "true";

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!noStepUp) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      console.log("Stepping up");
      window.sessionStorage.setItem("noStepUp", "true");
      oktaAuth.signInWithRedirect({
        acrValues: config.oidc.stepup_level,
        maxAge: 0,
      });
    } else {
      console.log("Not Stepping up");
      window.sessionStorage.setItem("noStepUp", "false");
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (noStepUp) return <Outlet />;
};

export const StepupAuthForce = () => {
  const { oktaAuth, authState } = useOktaAuth();

  var noStepUp = window.sessionStorage.getItem("noStepUp") == "true";

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!noStepUp) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      console.log("Stepping up");
      window.sessionStorage.setItem("noStepUp", "true");
      oktaAuth.signInWithRedirect({ prompt: "login" });
    } else {
      console.log("Not Stepping up");
      window.sessionStorage.setItem("noStepUp", "false");
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (noStepUp) return <Outlet />;
};

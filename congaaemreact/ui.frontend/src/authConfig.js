/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: 'rlp-dev-spa',
        authority: 'https://login.congacloud.io/int/api/v1/auth',
        redirectUri: 'http://localhost:4502/content/congaaemreact/us/en/home.html',
        knownAuthorities: ['https://login.congacloud.io/int/api/v1/auth'],
        protocolMode: "OIDC",
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
            
            }	
        }	
    }
};


export const loginRequest = {
    scopes: ["openid"]
    
};



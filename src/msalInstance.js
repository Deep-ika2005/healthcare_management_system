import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msalconfig";

export const msalInstance = new PublicClientApplication(msalConfig);
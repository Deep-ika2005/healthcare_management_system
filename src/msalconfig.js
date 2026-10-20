
export const msalConfig = {
  auth: {
    clientId: "2f6226a9-f3fa-4a02-b6fb-b8cab0a16c67",       
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000/login",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

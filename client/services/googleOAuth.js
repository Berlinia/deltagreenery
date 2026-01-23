let tokenClient;
let accessToken = null;

export function initGoogleOAuth(clientId) {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    callback: (resp) => {
      if (resp.error) {
        console.error("OAuth error", resp);
        return;
      }
      accessToken = resp.access_token;
      console.log("Got access token");
    },
  });
}

export function authorizeGoogle() {
  // Must be called from a user gesture (button click)
  tokenClient.requestAccessToken();
}

export function getAccessToken() {
  return accessToken;
}

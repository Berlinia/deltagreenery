// client/services/googleSheets.js

import { getGoogleAccessToken } from "./googleOAuth";

async function googleFetch(url, options = {}) {
  const token = getGoogleAccessToken();
  if (!token) {
    throw new Error("Not authorized with Google");
  }

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Read values from a Google Sheet
 */
export async function readSheetValues(spreadsheetId, rangeA1) {
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/` +
    encodeURIComponent(rangeA1);

  const res = await googleFetch(url);
  if (!res.ok) {
    throw new Error(`Sheets API error ${res.status}`);
  }

  return res.json();
}

/**
 * Write values to a Google Sheet
 */
export async function writeSheetValues(spreadsheetId, rangeA1, values) {
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/` +
    encodeURIComponent(rangeA1) +
    "?valueInputOption=RAW";

  const res = await googleFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values }),
  });

  if (!res.ok) {
    throw new Error(`Sheets API error ${res.status}`);
  }

  return res.json();
}

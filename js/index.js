var DataStore = {
  api_url: "https://us-central1-nandiraju-api.cloudfunctions.net/app",
  uuid: function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  },
  remove: function (namespace) {
    localStorage.removeItem(namespace);
  },
  set: function (namespace, collection) {
    localStorage.setItem(namespace, JSON.stringify(collection));
  },
  get: function (namespace) {
    let collection = localStorage.getItem(namespace);
    if (collection != undefined && collection != "" && collection != " ") {
      collection = JSON.parse(collection);
    } else {
      collection = [];
    }
    return collection;
  },
  getObject: function (namespace) {
    let collection = localStorage.getItem(namespace);
    if (collection != undefined && collection != "" && collection != " ") {
      collection = JSON.parse(collection);
    } else {
      collection = {};
    }
    return collection;
  },
};

function randDarkColor() {
  var lum = -0.25;
  var hex = String(
    "#" + Math.random().toString(16).slice(2, 8).toUpperCase()
  ).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}

// --- Fetch stock images for screens.
function fetchImages() {
  var url =
    "https://api.unsplash.com/search/photos?page=1&query=pharmacy&per_page=20&client_id=WztAjjff7Z9mPXfGCNwmu8qPlVOIjuZaDErzoSy-5Tw";

  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log(JSON.stringify(response));
      var images = response.results;
      DataStore.set("STOCK_IMAGES", images);
      STOCK_IMAGES = images;
    });
}
// GLOBALS
var STOCK_IMAGES = DataStore.get("STOCK_IMAGES");
if (STOCK_IMAGES == undefined || STOCK_IMAGES.length < 1) {
  fetchImages();
}

function debug(msg) {
  console.log(msg);
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var search_terms = [
  { id: 1, term: "Java" },
  { id: 1, term: "JIRA" },
  { id: 1, term: "CPP" },
  { id: 1, term: "Android" },
  { id: 1, term: "Kotlin" },
  { id: 1, term: "SwiftUI" },
  { id: 1, term: "ObjectiveC" },
  { id: 1, term: "Python" },
  { id: 1, term: "Google Analytics" },
  { id: 1, term: "AWS Architect" },
  { id: 1, term: "GCP Architect" },
];

var API_URL =
  "https://script.google.com/macros/s/AKfycbxXV-BbGllCU5ystTIhaipvrv_73XlBOvc64yzFR8ScDTZg_XNO1cy6wx4x04q67VhrQQ/exec?path=";

var ALL_PROMPTS = [];
var COLORS = [];
var NEWS_FEED = [];
var ALL_EXPERTS = [];
const Tables = {
  BOOKMARKED_PROMPTS: "bookmarked_prompts",
  BOOKMARKED_NEWS: "bookmarked_news",
  BOOKMARKED_JOURNAL: "bookmarked_journal",
  JOURNAL: "bookmarked_prompts",
  CUSTOM_PROMPTS: "custom_prompts",
};
function loadExpertsData() {
  fetch(API_URL + "experts", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      ALL_EXPERTS = response;
      app.emit("experts-data-loaded");
    });
}
loadExpertsData();

var TIPS_CATEGORY_MENU = undefined;
function loadTipsData() {
  if (TIPS_CATEGORY_MENU) {
    app.emit("tips-data-loaded");
    debug("Returning data already there");
    return;
  }
  // Only if data is not loaded , fetch.
  fetch(API_URL + "tips", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      TIPS_CATEGORY_MENU = response;
      app.emit("tips-data-loaded");
    });
}

const EVENT_TYPES = {
  PROMPTS: "prompts",
  INTERVIEWS: "interviews",
};

var DASHBOARD = {
  prompts: 0,
  entries: 0,
  days: 0,
  emotion_negative: 0,
  emotion_neutral: 0,
  emotion_positive: 0,
  custom_prompts: 0,
  instant_prompts: 0,
};
function computeDashboard(changedObject) {
  if (changedObject?.eventType == EVENT_TYPES.PROMPTS) {
    let allPrompts = changedObject.payload;
    DASHBOARD.prompts = 200 + allPrompts.length;
    DASHBOARD.custom_prompts = allPrompts.length;
  }
  if (changedObject?.eventType == EVENT_TYPES.NOTES) {
    let allNotes = changedObject?.payload;
    DASHBOARD.entries = allNotes?.length;
    DASHBOARD.days = allNotes?.length;
  }
  app.emit("render-dashboard");
  // debug(DASHBOARD);
}

// Sharing pluginin.
function shareApp() {
  var pageURL = "https://apps.apple.com/us/app/kiran-prabha/id769620514";
  if (app.device.android) {
    pageURL =
      "https://play.google.com/store/apps/details?id=net.kiranprabha.app1";
  }
  window.plugins.socialsharing.share("StarSocial app.", null, null, pageURL);
}
// In app browser pluginin.
function showInBrowser(url_to_show) {
  var ref = cordova.InAppBrowser.open(
    url_to_show,
    "_blank",
    "location=no,footer=yes,closebuttoncaption=Close,zoom=no,footercolor=#FF5B2A,closebuttoncolor=#ffffff"
  );
}

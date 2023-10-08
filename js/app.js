var $$ = Dom7;
var app = new Framework7({
  touch: {
    fastClicks: true,
  },
  statusbar: {
    enable: false,
  },
  dialog: {
    title: "Travelz.ai",
  },
  view: {
    stackPages: true,
  },
  root: "#app", // App root element
  id: "com.nandiraju.travelz.ai", // App bundle ID
  name: "Travelz.ai", // App name
  theme: "md", // Automatic theme detection
  routes: [
    {
      path: "/home",
      componentUrl: "./pages/home.html",
      name: "agent",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/",
      componentUrl: "./pages/iten.html",
      name: "splash",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/dates/",
      component: "./pages/dates.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/howmany/",
      component: "./pages/howmany.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/preferences/",
      component: "./pages/preferences.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/iten/",
      component: "./pages/iten.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/tips_detail/",
      component: "./pages/tips_detail.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/tips_detail/:tip_category",
      component: "./pages/tips_detail.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/notes/:note_title",
      name: "my_notes",
      component: "./pages/notes.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/interviews/",
      name: "interviews",
      component: "./pages/interviews.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/dashboard/",
      component: "./pages/dashboard.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/settings/",
      component: "./pages/settings.html",
      options: {
        transition: "f7-push",
      },
    },
    {
      path: "/bookmarks/",
      component: "./pages/bookmarks.html",
      options: {
        transition: "f7-push",
      },
    },
  ],
});
var mainView = app.views.create(".view-main", {
  url: "/",
});

function loadScreen(path) {
  mainView.router.navigate(path);
}

function goBack() {
  mainView.router.back();
}

function showInBrowser(url_to_show) {
  var ref = cordova.InAppBrowser.open(
    url_to_show,
    "_blank",
    "location=no,footer=yes,closebuttoncaption=Close,zoom=no,footercolor=#FF5B2A,closebuttoncolor=#ffffff"
  );
}

function showToast(message, position) {
  if (!position) position = "top";
  var toastCenter = app.toast.create({
    text: message,
    position: "bottom",
    closeTimeout: 2000,
  });
  toastCenter.open();
}

function renderTemplateToHolder(template, holder, data) {
  var ui_template = $$(template).html();
  var compiled_template = Template7.compile(ui_template);
  var html_code = compiled_template(data);
  $$(holder).html(html_code);
}

function generateHTMLCard(template, data) {
  var ui_template = $$(template).html();
  var compiled_template = Template7.compile(ui_template);
  var html_code = compiled_template(data);
  return html_code;
}

//default dark meta
//document.getElementsByTagName("META")[5].content = "#222";

// Dark mode setting..
function setDarkmode(flag) {
  if (flag) {
    $$("#app").removeClass("theme-light");
    $$("#app").addClass("theme-dark");
    // Change meta tag and find by index order
    document.getElementsByTagName("META")[5].content = "#222";
    StatusBar.styleLightContent(); //Use the lightContent statusbar (light text, for dark backgrounds).
  } else {
    $$("#app").removeClass("theme-dark");
    $$("#app").addClass("theme-light");
    document.getElementsByTagName("META")[5].content = "#fff";
    StatusBar.styleDefault(); //Use the default statusbar (dark text, for light backgrounds).
  }
}

// Check and set dark mode
function checkAndSetTheme() {
  var is_checked = DataStore.getObject("DARKMODE");
  if (is_checked) {
    setDarkmode(true);
  } else {
    setDarkmode(false);
  }
}
//checkAndSetTheme();

app.on("update-dashboard", function (data) {
  computeDashboard(data);
});

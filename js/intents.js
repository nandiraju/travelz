app.on("health-news", function (data) {
  fireMessage("Trending news on hospital discharge");
  app.request.promise
    .get(DataStore.api_url + "/news?source=bing&q=hospital%20discharge", {})
    .then(function (result) {
      var news_feed = JSON.parse(result.data);
      news_feed.forEach((element) => {
        if (element.image == undefined || element.image == "") {
          rix = Math.floor(Math.random() * 19); // random image index;
          //element.image = STOCK_IMAGES[rix].urls.small;
        }
      });
      var html_txt = generateHTMLCard("#news_scroll", {
        news_feed,
      });
      var card = {
        msg: html_txt,
        css_class: "scroller-card",
        noTail: true,
      };
      app.emit("append-card-to-chat", {
        card,
      });
    });
});

app.on("show-bp", function (data) {
  //debug(JSON.stringify(data.payload.responses));
  fireMessage("Here is your BP score for last 6 months.");

  var html_txt = generateHTMLCard("#h_list", {
    items: [
      { value: '120/50', month: "OCT" },
      { value: '110/70', month: "SEP" },
      { value: '140/80', month: "AUG" },
      { value: '176/88', month: "JUL" },
      { value: '160/90', month: "JUN" },
    ],
  });

  var card = {
    msg: html_txt,
    css_class: "scroller-card",
    noTail: true,
  };
  app.emit("append-card-to-chat", {
    card,
  });
});

function fireMessage(message) {
  if (message.indexOf("_") > -1) {
    fireTokenizedMessage(message);
    return;
  }
  app.emit("append-card-to-chat", {
    card: {
      msg: message,
      cssClass: "message message-received message-tail",
    },
  });
}

function fireTokenizedMessage(message) {
  var ary = message.split("_");
  //debug("Tokenized data " + ary);
  var offset = 0;
  ary.forEach(function (message_token, index) {
    if (message_token.trim().length > 0) {
      setTimeout(function () {
        let show_typing = true;
        if (index == ary.length - 1) {
          show_typing = false;
        }
        app.emit("append-card-to-chat", {
          card: {
            msg: message_token,
            show_typing: show_typing,
          },
        });
      }, 50 + offset);
      offset += 2000;
    }
  });
}
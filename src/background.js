function openMyPage() {
   browser.tabs.create({
     "url": "/index.html"
   });
}

function onVisited(historyItem) {
  if (historyItem.url == browser.extension.getURL("./index.html")) {
    browser.history.deleteUrl({url: historyItem.url});
  }
}

browser.browserAction.onClicked.addListener(openMyPage);
browser.history.onVisited.addListener(onVisited);

// dev only
openMyPage();

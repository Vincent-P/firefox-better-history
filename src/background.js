/*
Open a new tab, and load "index.html" into it.
*/
function openMyPage() {
   browser.tabs.create({
     "url": "/index.html"
   });
}


/*
Add openMyPage() as a listener to clicks on the browser action.
*/
browser.browserAction.onClicked.addListener(openMyPage);
browser.tabs.reload();

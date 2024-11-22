// this script will be executed when the button on the popup is clicked.
// the popup will show if the extension is clicked.
// the extension can be found on the top right of the browser.

document.getElementById("actionButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (_tabs) => {
    // do nothing
  });
});

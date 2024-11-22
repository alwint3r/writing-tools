chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "myWritingTools", // how is this going to be used?
    title: "Alwin's Writing Tools",
    contexts: ["selection"], // this will only show up when text is selected
  });

  chrome.contextMenus.create({
    id: "myTranslateText",
    title: "Translate to Bahasa Indonesia",
    parentId: "myWritingTools",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "searchOnArxiv",
    title: "Search on Arxiv",
    parentId: "myWritingTools",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "myTranslateText") { // so this is where the ID is used
    chrome.tabs.sendMessage(tab.id, { action: "translateText" }); // what does this mean?
  }

  if (info.menuItemId === "searchOnArxiv") {
    chrome.tabs.sendMessage(tab.id, { action: "searchOnArxiv" });
  }
});

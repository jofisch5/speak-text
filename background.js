browser.contextMenus.create({
  id: "speak",
  title: "Speak Text",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  browser.tabs.sendMessage(tab.id, { text: info.selectionText });
});

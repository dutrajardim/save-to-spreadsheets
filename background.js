let token

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({"url": "pages/home/index.html"});
});

chrome.identity.getAuthToken({
    interactive: true
}, (token) => {
    this.token = token
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greetings == "getToken") sendResponse({ token: this.token })
    return true
})
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({url: 'https://docs.google.com/spreadsheets/d/1Tsz47yApWk-9DRwIks-2eAPwzShlPDgXH8XR-zCFNB0/edit#gid=0'});
});

let token

chrome.identity.getAuthToken({ 
    interactive: true 
}, (token) => {
    this.token = token
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greetings == "getToken") sendResponse({ token: this.token })
    return true
})
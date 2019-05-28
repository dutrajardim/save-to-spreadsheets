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
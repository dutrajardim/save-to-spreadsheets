(() => {

    let navigation = document.querySelector("dj-navigation")
    navigation.active = "nav-empenhos"
})()

let getData = () => {

}

let renderData = token => {
    let sheetsUrl = "https://sheets.googleapis.com/v4/spreadsheets/"
    let key = configs.apiKey
    let sheetId = configs.sheetId
    let searchParams = new URLSearchParams({
        majorDimension: "ROWS",
        valueRenderOption: "FORMULA",
        key: key
    })
    let url = sheetsUrl + sheetId + '/values/' + encodeURIComponent("Empenhos!B:K") + '?' + searchParams.toString()

    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", url, true)
    xmlHttp.responseType = 'json';
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token)
    xmlHttp.setRequestHeader('Accept', 'application/json')
    xmlHttp.onerror = function (e) {
        console.error(xmlHttp.statusText);
    }
    xmlHttp.onload = function (e) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                $('dj-table').get(0).data = xmlHttp.response.values
            } else {
                console.error(xmlHttp.statusText);
            }
        }
    }
    xmlHttp.send(null)
}


chrome.runtime.sendMessage({
    greetings: 'getToken'
}, (response) => {
    renderData(response.token)
})
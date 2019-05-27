// data
let token
let screenData
const manifestData = chrome.runtime.getManifest();

// functions 
let loadScreenData = () => {
    screenData = screenData? screenData : {}

    screenData.id = (new URL(window.location.href)).searchParams.get("id")
    screenData.url = window.location.href
    screenData.spec = document.getElementById("numSeqPorUnContabil").innerHTML.trim()
    screenData.type = document.getElementById("tipoEsp").innerHTML.trim()
    screenData.status = document.getElementById("situacaoEsp").innerHTML.trim()
    screenData.processNumber = document.getElementById("numeroProcesso").innerHTML.trim()
    screenData.contract = document.getElementById("numeroContrato").innerHTML.trim()
    screenData.suplierId = document.getElementById("idFornecedor").innerHTML.trim()
    screenData.suplierName = document.getElementById("nomeFornecedor").innerHTML.trim()
    screenData.elementItem = document.getElementById("idElementoItemDespesa").innerHTML.trim()
    screenData.empenho = document.getElementById("codigoUnidadeOrcamentaria").innerHTML.trim() +
        "-" + document.getElementById("codigoUnidadeContabil").innerHTML.trim() +
        "-" + document.getElementById("anoEmpenho").innerHTML.trim() +
        "-" + document.getElementById("numeroEmpenho").innerHTML.trim()
    screenData.dotacao = document.getElementById("idDotacao").innerHTML.trim()
    screenData.value = document.getElementById("valorTotal").innerHTML.trim()
}

let openSheetHandler = () => {
    let win = window.open('https://docs.google.com/spreadsheets/d/1Tsz47yApWk-9DRwIks-2eAPwzShlPDgXH8XR-zCFNB0/edit#gid=0', '_blank')
    win.focus()
}

let saveInformationHandler = () => {
    let sheetsUrl = "https://sheets.googleapis.com/v4/spreadsheets/"
    let key = manifestData.key
    let sheetId = '1Tsz47yApWk-9DRwIks-2eAPwzShlPDgXH8XR-zCFNB0'
    let searchParams = new URLSearchParams({
        insertDataOption: "INSERT_ROWS",
        valueInputOption: "RAW",
        key: key
    })
    let url = sheetsUrl + sheetId + '/values/' + encodeURIComponent("Empenhos!A1") + ':append?' + searchParams.toString()

    let init = { 
        method: 'POST',
        async: true,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "values": [[screenData.id, screenData.spec, screenData.status, screenData.processNumber, screenData.contract,
            screenData.suplierId, screenData.suplierName, screenData.empenho, screenData.dotacao, screenData.value,
            screenData.elementItem ]]
        })
    }
    
    fetch(url, init)
        .then((response) => {
            console.log(response)
        })
        .then((data) => {
            console.log(data)
        });
}

// start data
chrome.runtime.sendMessage({
    greetings: 'getToken'
}, (response) => {
    token = response.token
})
loadScreenData()

let menu = document.createElement('dj-menu')

menu.actions = [
    {
        icon: "favorite",
        handler: saveInformationHandler
    },
    {
        icon: "open_in_browser",
        handler: openSheetHandler
    }
]

document.body.appendChild(menu)
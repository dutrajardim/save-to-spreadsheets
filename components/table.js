(() => {
const template = document.createElement('template')

template.innerHTML = `
<div class="table-responsive">
    <table class="table table-bordered table-striped">
        <thead>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
`

class Table extends HTMLElement {
    constructor() {
        super()
        this.appendChild(template.content.cloneNode(true))
        this.$header = this.querySelector('thead')
        this.$body = this.querySelector('tbody')
    }

    _renderHeader() {
        this.$header.innerHTML = ""
        let tr = document.createElement("tr")

        this._header.forEach((col, i) => {
                let th = document.createElement("th")
                th.innerHTML = col
                tr.appendChild(th)
        })

        this.$header.appendChild(tr)
    }

    _renderBody() {
        this.$body.innerHTML = ""
        this._body.forEach((row, index) => {
            let tr = document.createElement("tr")

            row.forEach((col, i) => {
                    let td = document.createElement("td")
                    let regex = /=HYPERLINK\("(.*)";"(.*)"\)/
                    let matches = regex.exec(col)

                    if (matches) td.innerHTML = `<a href="${matches[1]}" target="_blank">${matches[2]}</a>`
                    else td.innerHTML = col
                    tr.appendChild(td)
            })
            this.$body.appendChild(tr)
        })
    }

    set data(val) {
        this._header = val.shift()
        this._renderHeader()

        this._body = val
        this._renderBody()
    }

    get data() {
        return this._header.concat(this._body)
    }
}
customElements.define('dj-table', Table)

})()
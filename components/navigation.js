(() => {
    const template = document.createElement('template')

    template.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">Controles</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item" id="nav-home">
                            <a class="nav-link" href="/pages/home/index.html">Home</a>
                        </li>
                        <li class="nav-item" id="nav-empenhos">
                            <a class="nav-link" href="/pages/empenhos/index.html">Empenhos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `

    class Navigation extends HTMLElement {
        constructor() {
            super()
            this.appendChild(template.content.cloneNode(true))
            this.$title = this.querySelector(".navbar-brands")
        }

        set active(el) {
            let navItem = this.querySelector("#" + el)
            if (navItem) {
                navItem.className += " active"
            }
        }

    }
    customElements.define('dj-navigation', Navigation)

})()
(() => {
    const template = document.createElement('template')

    template.innerHTML = `
        <footer class="py-5 bg-dark">
            <div class="container">
                <p class="m-0 text-center text-white">Created by RDJ</p>
            </div>
            <!-- /.container -->
        </footer>
    `

    class Footer extends HTMLElement {
        constructor() {
            super()
            this.appendChild(template.content.cloneNode(true))
        }

    }
    customElements.define('dj-footer', Footer)

})()
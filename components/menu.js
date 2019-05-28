let template = document.createElement('template')

template.innerHTML = `
<style>
.material-icons {
    font-family: 'Material Icons';
    font-style: normal;
    font-size: 26px;
    color: #fff;
    white-space: nowrap;
    text-rendering: optimizeLegibility;
}

:host {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
}

:host input {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    z-index:20;
    border-radius: 80px;
    opacity:0;
    cursor:pointer;
}

.hamburger {
    position: absolute;
    right: 0;
    width: 50px;
    height: 50px;
    background-color: #E84F3E;
    border-radius:100%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
    z-index:10;
    cursor:pointer;
}
.dots span {
    position: absolute;
    top: 45%;
    font-size: 6pt;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background:#fff;
    z-index:20;
    transition: all .3s ease-in-out;
}
  
.first {
    margin-left:1.5em;
}

.second {
    margin-left:2.8em;
}

.third {
    margin-left:4.1em;
}

:host input:checked ~ .hamburger .dots .first {
    top: 15px;
    height: 30px;
    transform-origin:top;
    transform:rotate(-45deg);
    transition: all .3s ease-in-out;    
}

:host input:checked ~ .hamburger .dots .third {
    top: 15px;
    height: 30px;
    transform-origin:top;
    transform:rotate(45deg);
    transition: all .3s ease-in-out;
}

.action_items_bar {
    display: flex;
    padding-right: 65px;
    padding-left: 25px;
    top: 0;
    right: 0;
    height: 50px;
    background-color: #E84F3E;
    border-radius:50px;
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.3);
    z-index:5;
    transform:scaleX(0);
    transition: all .3s ease-in-out;
}

.action_items {
    display: flex;
    align-items: center;
}
  
:host input:checked ~ .action_items_bar {
    transform:scaleX(1);
}

.action_items span {
    opacity: 0;
    transition: all .2s ease-in-out;
    cursor: pointer;
    padding: 10px;
}

:host input:checked ~ .action_items_bar .action_items span {
    opacity:1;
    transition-delay:.45s;
}

</style>

<input type="checkbox" />
<div class="hamburger">
    <div class="dots">
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
    </div>
</div>
<div class="action_items_bar">
    <div class="action_items"></div>
</div>
`

class Menu extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ 'mode': 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$actions = this._shadowRoot.querySelector('.action_items')
    }

    _renderActionsList() {
        this.$actions.innerHTML = ""
        this._actions.forEach((action, index) => {
            let $al = document.createElement("span")
            let $il = document.createElement("i")
            $il.className = "material-icons"
            $il.innerHTML = action.icon

            $al.appendChild($il)
            $al.addEventListener('click', action.handler)

            this.$actions.appendChild($al)
        });
    }

    set actions(val) {
        this._actions =  val
        this._renderActionsList()
    }

    get actions() {
        return this._actions
    }
}
customElements.define('dj-menu', Menu)
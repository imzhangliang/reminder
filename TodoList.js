import Item from './Item.js';

class TodoList {
    #list = [];
    #parentDom = null;
    #handleChange = null;

    constructor(parentDom) {
        this.#parentDom = parentDom;
    }

    onChange(cb = null) {
        this.#handleChange = cb;
    }

    loadFromJSON(jsonStr) {
        this.#list = JSON.parse(jsonStr).map(item => Item.fromJSON(item));
    }

    saveAsJSON() {
        return JSON.stringify(this.#list.map(item => item.toJSON()));
    }


    add(item) {
        this.#list.push(item);
        this.render();
    }

    render() {
        if (this.#handleChange) {
            this.#handleChange(this.#list);
        }

        if (!this.#parentDom) {
            return ;
        }
        this.#parentDom.innerHTML = "";
        let html = `
        <ul>
            ${this.#list.map(item => `<li><input class="itemSelect" type="checkbox" />${item.getText()}</li>`).join('')}
        </ul>
        `;

        this.#parentDom.innerHTML = html;
    }

    removeSelectedItems() {
        let selectedIndex = this.getSelectedIndex();
        for (let i = selectedIndex.length - 1; i >= 0; i--) {
            this.#list.splice(selectedIndex[i], 1);
        }

        this.render();
    }

    getSelectedIndex() {
        let checkboxes = this.#parentDom.querySelectorAll('input.itemSelect[type="checkbox"]');
        let res = [];

        //console.log('length of checkboxes = ', checkboxes.length);
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                res.push(i);
            }
        }

        return res;
    }
}

export default TodoList;

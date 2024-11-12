import PriorityQueue from "./PriorityQueue.js";

class ScheduledList {
    #queue = null;
    #parentDom = null;
    #handleChange = null;

    constructor(parentDom) {
        this.#queue = new PriorityQueue((a, b) => a.nextDate() - b.nextDate());
        this.#parentDom = parentDom;
    }

    onChange(cb = null) {
        this.#handleChange = cb;
    }

    loadFromJSON(jsonStr) {
        this.#queue.loadFromJSON(jsonStr);
    }

    saveAsJSON() {
        return this.#queue.saveAsJSON();
    }

    add(item) {
        this.#queue.enqueue(item);
        this.render();
    }

    removeItem(index) {
        if (index >= 0 && index < this.#queue.size()) {
            this.#queue.remove(index);
            this.render();
        }
    }

    render() {
        if (this.#handleChange) {
            this.#handleChange(this.#queue);
        }
        if (!this.#parentDom) {
            return;
        }
        this.#parentDom.innerHTML = "";
        let html = `
        <ul>
            ${this.#queue
                .getList()
                .map(
                    (item, index) =>
                        `<li>${item.getText()} | ${item.nextDateString()} <a class="delete" index="${index}" href="#">delete</a></li>`,
                )
                .join("")}
        </ul>
        `;

        this.#parentDom.innerHTML = html;
        let deleteBtns = this.#parentDom.querySelectorAll('.delete');
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener('click', (event) => {
                event.preventDefault();
                console.log('delete', i);
                this.removeItem(i);
            });

        }

    }

    removeLatestItem() {
        let item = this.#queue.dequeue();
        if (item.caculateNextDate()) {
            this.#queue.enqueue(item);
        }
        this.render();

        return item;
    }

    peekLatestItem() {
        return this.#queue.peek();
    }
}

export default ScheduledList;

import PriorityQueue from './PriorityQueue.js';

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

    render() {
        if (this.#handleChange) {
            this.#handleChange(this.#queue);
        }
        if (!this.#parentDom) {
            return ;
        }
        this.#parentDom.innerHTML = "";
        let html = `
        <ul>
            ${this.#queue.getList().map(item => `<li>${item.getText()} | ${item.nextDate().toISOString()}</li>`).join('')}
        </ul>
        `;

        this.#parentDom.innerHTML = html;
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
